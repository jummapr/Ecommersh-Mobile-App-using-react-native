import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";
import { IconOptions } from "../screens/ProductDetails";

const CartItems = ({
  id,
  name,
  Stock,
  amount,
  imgSrc,
  qty,
  index,
  incrementHandler,
  decrementHandler,
  navigate
}) => {
  console.log(qty)
  return (
    <View style={{ flexDirection: "row", height: 100, marginVertical: 20 }}>
      <View
        style={{
          width: "40%",
          backgroundColor: index % 2 === 0 ? colors.color_1 : colors.color_3,
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }}
      >
        <Image
          source={{
            uri: imgSrc,
          }}
          style={{
            width: 200,
            height: "100%",
            resizeMode: "contain",
            top: "-20%",
            left: "10%",
          }}
        />
      </View>

      <View
        style={{
          width: "40%",
          paddingHorizontal: 25,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
          }}
          onPress={() => navigate.navigate("productdetails" , {id})}
        >
          {name}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
            fontWeight: "900",
          }}
        >
          ₹{amount}
        </Text>
      </View>

      <View
        style={styles.rightContainer}
      >
        {/* <TouchableOpacity onPress={() => decrementHandler(id,name,amount,imgSrc,Stock,qty)}>
          <Avatar.Icon icon={"minus"} size={20} {...IconOptions} />
        </TouchableOpacity> */}

        <Text
          style={styles.qtyText}
        >
          {qty}
        </Text>

        {/* <TouchableOpacity onPress={() => incrementHandler(id,name,amount,imgSrc,Stock,qty)}>
          <Avatar.Icon icon={"plus"} size={20} {...IconOptions} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
    qtyText: {
        backgroundColor: colors.colors_4,
        height: 25,
        width: 25,
        textAlignVertical: "center",
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.colors_5,
    },
    rightContainer: {
        alignItems: "center",
        width: "20%",
        height: 80,
        justifyContent: "space-between",
        alignSelf: "center",
    }
});
