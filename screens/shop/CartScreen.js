import React from "react"
import { View, Text, StyleSheet, Button, FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Colors from "../../constants/Colors"
import CartItem from "../../components/shop/CartItem"
import { removeFromCart } from "../../store/actions/cart"
import { addOrder } from "../../store/actions/orders"
import Card from "../../components/UI/Card"

const CartScreen = () => {
	const dispatch = useDispatch()
	const cartTotalAmount = useSelector(state => state.cart.totalAmount)
	const cartItems = useSelector(state => {
		const transformedCartItems = []
		for (const key in state.cart.items) {
			transformedCartItems.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				quantity: state.cart.items[key].quantity,
				sum: state.cart.items[key].sum,
			})
		}
		console.log("products : ", transformedCartItems)
		return transformedCartItems.sort((a, b) =>
			a.productId > b.productId ? 1 : -1
		)
	})

	return (
		<View style={styles.screen}>
			<Card style={styles.summary}>
				<Text style={styles.summaryText}>
					Total :{" "}
					<Text style={styles.amount}>
						$ {Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
					</Text>
				</Text>
				<Button
					color={Colors.accent}
					disabled={cartItems.length === 0}
					title="Order Now"
					onPress={() => {
						dispatch(addOrder(cartItems, cartTotalAmount))
					}}
				/>
			</Card>

			<FlatList
				data={cartItems}
				keyExtractor={item => item.productId}
				renderItem={itemData => (
					<CartItem
						quantity={itemData.item.quantity}
						title={itemData.item.productTitle}
						amount={itemData.item.sum}
						deleteable
						onRemove={() => {
							dispatch(removeFromCart(itemData.item.productId))
						}}
					/>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	amount: {
		color: Colors.primary,
	},
	screen: { margin: 20 },
	summary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
		padding: 10,
	},
	summaryText: {
		fontFamily: "open-sans-bold",
		fontSize: 18,
	},
})

CartScreen.navigationOptions = {
	headerTitle: "Your Cart",
}

export default CartScreen
