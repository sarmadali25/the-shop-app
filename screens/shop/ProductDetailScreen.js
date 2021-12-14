import React from "react"
import { View, Text, StyleSheet, ScrollView, Image, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Colors from "../../constants/Colors"
import * as cartActions from "../../store/actions/cart"
import { addToCart } from "../../store/actions/cart"

const ProductDetailScreen = props => {
	const dispatch = useDispatch()
	const productId = props.navigation.getParam("productId")
	const selectedProduct = useSelector(state =>
		state.products.availableProducts.find(prod => prod.id === productId)
	)
	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
			<View style={styles.actions}>
				<Button
					color={Colors.primary}
					title="Add To Cart"
					onPress={() => {
						dispatch(addToCart(selectedProduct))
					}}
				/>
			</View>
			<Text style={styles.price}>$ {selectedProduct.price}</Text>
			<Text style={styles.description}>{selectedProduct.description}</Text>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	actions: {
		marginVertical: 10,
		alignItems: "center",
	},
	description: {
		fontSize: 14,
		textAlign: "center",
		marginHorizontal: 20,
		fontFamily: "open-sans",
	},
	image: {
		width: "100%",
		height: 300,
	},
	price: {
		fontSize: 20,
		textAlign: "center",
		marginVertical: 20,
		color: "#888",
		fontFamily: "open-sans-bold",
	},
})

ProductDetailScreen.navigationOptions = navData => {
	return {
		headerTitle: navData.navigation.getParam("productTitle"),
	}
}
export default ProductDetailScreen
