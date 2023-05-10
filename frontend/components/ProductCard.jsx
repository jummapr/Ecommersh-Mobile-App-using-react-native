import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";

const ProductCard = ({
  stock,
  name,
  price,
  image,
  id,
  addToCardHandler,
  i,
  navigate,
}) => {
  return (
    <TouchableOpacity
    activeOpacity={1}
      onPress={() => navigate.navigate("productdetails", { id })}
    >
      <View
        style={{
          elevation: 15,
          width: 250,
          alignItems: "center",
          justifyContent: "space-between",
          margin: 20,
          borderRadius: 20,
          height: 300,
          backgroundColor: i % 2 === 0 ? colors.color_1 : colors.color_2,
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: "100%",
            height: 120,
            resizeMode: "contain",
            position: "absolute",
            left: 50,
            top: 105,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? colors.color_2 : colors.color_3,
              fontSize: 17,
              fontWeight: "300",
            }}
          >
            {name}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? colors.color_2 : colors.color_3,
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            ₹{price}
          </Text>
        </View>

        <TouchableOpacity style={{backgroundColor: i%2 === 0 ? colors.color_2: colors.color_3,
       borderRadius:0,
       borderBottomRightRadius:20,
       borderBottomEndRadius:20,
       width: '100%'
       }}>
            <Button onPress={() => addToCardHandler(id,name,price,image,stock)} textColor={i%2 === 0?colors.color_1: colors.color_2}>Add to Card</Button>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
