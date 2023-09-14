import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { colors, defaultStyle } from "../styles/styles";
import Heading from "../components/Heading";
import { Button } from "react-native-paper";
import CartItems from "../components/CartItems";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";


const Cart = () => {


  const navigate = useNavigation();
  const dispatch = useDispatch();

  const {cartItems} = useSelector(state => state.cart)
  // id,name,price,image,stock
  const decrementHandler = (id,name,price,image,stock,quantity) => {
    const newQty = quantity - 1;

    if(1 >= quantity) return dispatch({
      type: "removeFromCard",
      payload: id
    })

    dispatch({
      type: "addToCard",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity:newQty,
      }
    });
  }

  const incrementHandler = (id,name,price,image,stock,quantity) => {
      const newQty = quantity + 1;

      if(stock <= quantity) return Toast.show({
        type: "error",
        text1: "Maximum value added"
      });

      dispatch({
        type: "addToCard",
        payload: {
          product: id,
          name,
          price,
          image,
          stock,
          quantity: newQty,
        }
      });


  }

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      {/* Header */}
      <Header back={true} emptyCart={true} />

      {/* Heading */}

      <Heading text1={"Shopping"} text2={"Cart"} containerStyle={{paddingTop: 70, marginLeft: 35}} />

      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.length > 0 ? cartItems.map((item, index) => (
            <CartItems
            navigate={navigate}
              key={item.name}
              id={item.Product}
              name={item.name}
              Stock={item.Stock}
              amount={item.price}
              imgSrc={item.image}
              index={index}
              qty={item.quantity}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}

            />
          )): (
            <Text style={{textAlign: "center",fontSize: 18}}>No Items yet</Text>
          )}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}
      >
        <Text>{cartItems.length} items</Text>
        <Text>₹{cartItems.reduce((prev,curr) => prev + curr.quantity * curr.price,0)}</Text>
      </View>

      <TouchableOpacity onPress={cartItems.length > 0 ? () => navigate.navigate("confirmorder") : null}>
        <Button
          style={{
            backgroundColor: colors.color_3,
            borderRadius: 100,
            padding: 5,
            margin: 30,
          }}
          icon={"cart"}
          textColor={colors.color_2}
        >
          Check Out
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
