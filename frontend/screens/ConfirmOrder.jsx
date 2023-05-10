import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import ConfirmOrderItems from "../components/ConfirmOrderItem";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { useState } from "react";

const ConfirmOrder = () => {
    const navigate = useNavigation()


    const {cartItems} = useSelector(state => state.cart)

    const [itemPrice] = useState(cartItems.reduce((prev,curr) => prev + curr.quantity * curr.price,0));
    const [shippingCharges] = useState(itemPrice > 1000?0:200);
    const [tax]= useState(Number((0.18 * itemPrice).toFixed()));
    const [totalAmount] =useState(itemPrice + shippingCharges + tax);

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <Heading
        containerStyle={{ paddingTop: 70 }}
        text1="Confirm"
        text2="Order"
      />

      <View style={{ paddingVertical: 20, flex: 1 }}>
        <ScrollView>
          {cartItems.map((i) => (
            <ConfirmOrderItems
              key={i.name}
              image={i.image}
              name={i.name}
              price={i.price}
              qty={i.quantity}
            />
          ))}
        </ScrollView>
      </View>

      <PriceTag Heading={"SubTotal"} Value={itemPrice}/>
      <PriceTag Heading={"shipping"} Value={shippingCharges}/>
      <PriceTag Heading={"Tax"} Value={tax}/>
      <PriceTag Heading={"Total"} Value={totalAmount}/>


      <TouchableOpacity onPress={() => navigate.navigate("payment",{
        itemPrice,
        shippingCharges,
        tax,
        totalAmount,

      })}>

        <Button style={{
            backgroundColor: colors.color_3,
            borderRadius: 100,
            padding: 5,
            margin: 10,

        }} textColor={colors.color_2} icon={"chevron-right"}>Payment</Button>
      </TouchableOpacity>
    </View>
  );
};

const PriceTag = ({ Heading, Value }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    }}
  >
    <Text style={{fontWeight: "800",
     }}>{Heading}</Text>
    <Text> ₹{Value}</Text>
  </View>
);

export default ConfirmOrder;

const styles = StyleSheet.create({});
