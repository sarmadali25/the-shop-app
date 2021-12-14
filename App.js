import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import productsReducer from "./store/reducers/products"
import cartReducer from "./store/reducers/cart"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import ReduxThunk from "redux-thunk"
import ShopNavigator from "./navigation/ShopNavigation"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"
import { composeWithDevTools } from "redux-devtools-extension"
import ordersReducer from "./store/reducers/orders"
import { enableScreens } from "react-native-screens"

enableScreens()

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	})
}

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: ordersReducer,
})

const store = createStore(
	rootReducer,
	applyMiddleware(ReduxThunk),
	composeWithDevTools()
)

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false)

	if (!fontLoaded)
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => {
					setFontLoaded(true)
				}}
				onError={() => console.log("error => ", error)}
			/>
		)

	return (
		<Provider store={store}>
			<ShopNavigator />
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})
