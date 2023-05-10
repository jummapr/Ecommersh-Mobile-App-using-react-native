import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import { Avatar, Button } from "react-native-paper";
import { useState } from "react";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import { useIsFocused } from "@react-navigation/native";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, getProducts } from "../redux/actions/productActions";
import { useSetCategories } from "../utils/hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Home = ({ navigation }) => {
  // const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { products } = useSelector((state) => state.product);
  const [category, setCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [categories, setCategories] = useState([]);

  const categoryButtonHandler = (id) => {
    setCategory(id);
  };

  const addToCardHandler = (id, name, price, image, stock) => {
    if (stock === 0)
      return Toast.show({
        type: "error",
        text1: "Out of Stock",
      });
    dispatch({
      type: "addToCard",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: 1,
      },
    });

    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  // console.log(products)

  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    if (searchQuery || category) {
      const timeoutId = setTimeout(() => {
        dispatch(getAllProduct(searchQuery, category));
      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setTimeout(() => {
        dispatch(getProducts());
      }, 1000);
    }
  }, [dispatch, searchQuery, category, isFocused]);
  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}
      <View style={defaultStyle}>
        {/* Header */}
        <Header />

        {/* Heading Row */}

        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Heading */}
          <View>
            <Text style={{ fontSize: 25 }}>Our</Text>
            <Text style={{ fontSize: 25, fontWeight: "900" }}>Products</Text>
          </View>

          {/* Search Bar */}

          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon={"magnify"}
                size={50}
                color="gray"
                style={{ backgroundColor: colors.color_2, elevation: 12 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* categories */}

        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color_1 : colors.colors_5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                {" "}
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? colors.color_2 : "gray",
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Product */}

        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCardHandler={addToCardHandler}
                id={item._id}
                key={item._id}
                i={index}
                navigate={navigation}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <Footer activeRoute={"home"} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
