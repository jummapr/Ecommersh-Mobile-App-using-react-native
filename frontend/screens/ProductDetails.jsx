import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Carousel from "react-native-snap-carousel";
import { useRef, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../redux/actions/productActions";
import { useIsFocused } from "@react-navigation/native";

const SLIDER_WIDTh = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTh;

export const IconOptions = {
  size: 20,
  style: {
    borderRadius: 5,
    backgroundColor: colors.colors_5,
    height: 25,
    width: 25,
  },
};

const ProductDetails = ({ route: { params } }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {
    product: { name, price, stock, description, images },
  } = useSelector((state) => state.product);
  // console.log(name, price, stock, description, images);
 
  const isCarousel = useRef(null);
  const [quantity, setQuantity] = useState(1);

  const incrementQty = () => {
    if (stock <= quantity) return Toast.show({
      type: "error",
      text1: "Maximum Quantity Reached",
    });
    setQuantity((prev) => prev + 1);
  };
  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCardHandler = () => {
    if(stock === 0) return Toast.show({
      type: "error",
      text1: "Out of Stock",
    })
    dispatch({
      type: "addToCard",
      payload: {
        product: params.id,
        name,
        price,
        image: images[0]?.url,
        stock,
        quantity,
      }
    });

    Toast.show({
      type: "success",
      text1: "Added To Cart",
    })
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, isFocused]);

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color_1,
      }}
    >
      <Header back={true} />
      {/* carousel */}
      <Carousel
        layout="stack"
        sliderWidth={SLIDER_WIDTh}
        itemWidth={ITEM_WIDTH}
        ref={isCarousel}
        data={images}
        renderItem={CarouselCardItem}
      />

      <View
        style={{
          backgroundColor: colors.color_2,
          padding: 35,
          flex: 1,
          marginTop: -380,
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: 25,
          }}
        >
          {name}
        </Text>

        <Text
          numberOfLines={2}
          style={{
            fontSize: 18,
            fontWeight: "900",
          }}
        >
          ₹{price}
        </Text>

        <Text
          numberOfLines={8}
          style={{
            letterSpacing: 1,
            lineHeight: 20,
            marginVertical: 15,
          }}
        >
          {description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ color: colors.color_3, fontWeight: "100" }}>
          quantity
          </Text>

          <View
            style={{
              width: 80,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={decrementQty}>
              <Avatar.Icon icon={"minus"} {...IconOptions} />
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity onPress={incrementQty}>
              <Avatar.Icon icon={"plus"} {...IconOptions} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.9} onPress={addToCardHandler}>
          <Button icon={"cart"} textColor={colors.color_2} style={styles.btn}>
            Add To Cart
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CarouselCardItem = ({ item, index }) => (
  <View style={styles.container} key={index}>
    <Image source={{ uri: item.url }} style={styles.image} />
  </View>
);

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color_1,
    width: ITEM_WIDTH,
    paddingVertical: 54,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 250,
  },
  quantity: {
    backgroundColor: colors.colors_4,
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.colors_5,
  },
  btn: {
    backgroundColor: colors.color_3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});
