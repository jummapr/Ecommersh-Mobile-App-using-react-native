import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors } from "../styles/styles";
import { useState } from "react";
import MyModal from "./MyModal";

const ProductListItems = ({
  navigate,
  deleteHandler,
  i,
  id,
  price,
  stock,
  name,
  category,
  imgSrc,
}) => {


    const [openModal,setOpenModal] = useState(false)

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => setOpenModal((prev) => !prev)}
        onPress={() => navigate.navigate("productdetails", { id })}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: i % 2 === 0 ? colors.color_1 : colors.color_3,
          }}
        >
          <Image
            source={{
              uri: imgSrc,
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
            }}
          />

          <Text
            style={{
              width: 60,
              color: colors.color_2,
            }}
            numberOfLines={1}
          >
            ₹{price}
          </Text>
          <Text
            style={{
              maxWidth: 120,
              color: colors.color_2,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            style={{
              width: 60,
              color: colors.color_2,
            }}
            numberOfLines={1}
          >
            {category}
          </Text>
          <Text
            style={{
              width: 40,
              color: colors.color_2,
            }}
            numberOfLines={1}
          >
            {stock}
          </Text>
        </View>
      </TouchableOpacity>

      {
        openModal && (
            <MyModal id={id} deleteHandler={deleteHandler} navigate={navigate} setOpenModal={setOpenModal} />
        )
      }
    </>
  );
};

export default ProductListItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
