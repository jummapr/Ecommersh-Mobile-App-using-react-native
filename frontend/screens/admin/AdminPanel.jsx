import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, defaultStyle } from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import ButtonBox from "../../components/ButtonBox";
import ProductListHeading from "../../components/ProductListHeading";
import ProductListItems from "../../components/ProductListItem";
import Chart from "../../components/Chart";
import {
  useAdminProducts,
  useMessageAndErrorFromOther,
} from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { deleteProduct } from "../../redux/actions/otherActions";
import { getAdminProduct } from "../../redux/actions/productActions";

const AdminPanel = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loading, products, inStock, outOfStock } = useAdminProducts(
    dispatch,
    isFocused
  );

  const navigationHandler = (text) => {
    switch (text) {
      case "category":
        navigation.navigate("categories");
        break;
      case "All Orders":
        navigation.navigate("adminorders");
        break;
      case "Product":
        navigation.navigate("newproduct");
        break;
      default:
        navigation.navigate("adminorders");

        break;
    }
  };
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const loadingDelete = useMessageAndErrorFromOther(
    dispatch,
    null,
    null,
    getAdminProduct
  );
  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* Heading */}
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={styles.heading}>Admin Panel</Text>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.color_3,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Chart inStock={inStock} outOfStock={outOfStock} />
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between",
              }}
            >
              <ButtonBox
                icon={"plus"}
                text={"Product"}
                handler={navigationHandler}
              />
              <ButtonBox
                icon={"format-list-bulleted-square"}
                text={"All Orders"}
                handler={navigationHandler}
                reverse={true}
              />

              <ButtonBox
                icon={"format-list-bulleted-square"}
                text={"category"}
                handler={navigationHandler}
              />
            </View>
          </View>

          <ProductListHeading />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {!loadingDelete &&
                products.map((item, index) => (
                  <ProductListItems
                    navigate={navigation}
                    deleteHandler={deleteProductHandler}
                    key={item._id}
                    i={index}
                    price={item.price}
                    stock={item.stock}
                    name={item.name}
                    category={item.category?.category}
                    imgSrc={item.images[0].url}
                    id={item._id}
                  />
                ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: colors.color_3,
    color: colors.color_2,
    padding: 5,
    borderRadius: 5,
  },
});
