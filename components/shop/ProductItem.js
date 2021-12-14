import React from "react"
import {
	View,
	Text,
	Button,
	StyleSheet,
	Image,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback,
} from "react-native"
import Colors from "../../constants/Colors"
import Card from "../UI/Card"

const ProductItem = props => {
	let TouchableCmp = TouchableOpacity

	if (Platform.OS === "android" && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback
	}
	return (
		<Card style={styles.product}>
			<View style={styles.touchable}>
				{/* props.onViewDetail */}
				<TouchableCmp onPress={props.onSelect} useForeGround>
					<View>
						<View style={styles.imageContainer}>
							<Image style={styles.image} source={{ uri: props.image }} />
						</View>
						<View style={styles.details}>
							<Text style={styles.title}>{props.title}</Text>
							<Text style={styles.price}>$ {props.price}</Text>
						</View>
						<View style={styles.actions}>
							{/* <Button
								color={Colors.primary}
								title="View Details"
								onPress={props.onViewDetail}
							/>
							<Button
								color={Colors.primary}
								title="Add To Cart"
								onPress={props.onAddToCart}
							/> */}
							{props.children}
						</View>
					</View>
				</TouchableCmp>
			</View>
		</Card>
	)
}

const styles = StyleSheet.create({
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "20%",
		paddingHorizontal: 20,
	},
	details: {
		height: "20%",
		alignItems: "center",
		padding: 10,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageContainer: {
		width: "100%",
		height: "60%",
		overflow: "hidden",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	product: {
		height: 320,
		margin: 20,
	},
	price: {
		fontSize: 14,
		color: "#888",
		fontFamily: "open-sans",
	},
	title: {
		fontSize: 18,
		marginVertical: 4,
		fontFamily: "open-sans-bold",
	},
	touchable: {
		borderRadius: 10,
		overflow: "hidden",
	},
})
export default ProductItem
