import { StyleSheet, Text, View, Image } from "react-native";

const ConfirmOrderItems = ({ image, name, price, qty }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{width: 50,height: 50,resizeMode: "contain",}}
      />

      <Text>{name}</Text>
      <View style={{
        flexDirection :"row"
      }}>

      <Text>{qty}</Text>
      <Text style={{marginHorizontal: 10,}}>X</Text>
      <Text> ₹{price }</Text>

      </View>
    </View>
  );
};

export default ConfirmOrderItems;

const styles = StyleSheet.create({});
