import React from "react"
import { View, Text, FlatList, Platform, Button } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { useDispatch, useSelector } from "react-redux"
import ProductItem from "../../components/shop/ProductItem"
import * as cartActions from "../../store/actions/cart"
import HeaderButton from "../../components/UI/HeaderButton"
import Colors from "../../constants/Colors"

const ProductsOverviewScreen = props => {
	const products = useSelector(state => state.products.availableProducts)
	const dispatch = useDispatch()
	const selectItemHandler = (id, title) => {
		props.navigation.navigate("ProductDetail", {
			productId: id,
			productTitle: title,
		})
	}

	return (
		<FlatList
			data={products}
			renderItem={itemData => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => {
						selectItemHandler(itemData.item.id, itemData.item.title)
					}}
				>
					<Button
						color={Colors.primary}
						title="View Details"
						onPress={() => {
							selectItemHandler(itemData.item.id, itemData.item.title)
						}}
					/>
					<Button
						color={Colors.primary}
						title="Add To Cart"
						onPress={() => {
							dispatch(cartActions.addToCart(itemData.item))
						}}
					/>
				</ProductItem>
			)}
		/>
	)
}

ProductsOverviewScreen.navigationOptions = navData => {
	return {
		headerTitle: "All Products",
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Cart"
					iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
					onPress={() => {
						navData.navigation.navigate("Cart")
					}}
				></Item>
			</HeaderButtons>
		),
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
					onPress={() => {
						navData.navigation.toggleDrawer()
					}}
				></Item>
			</HeaderButtons>
		),
	}
}
export default ProductsOverviewScreen
