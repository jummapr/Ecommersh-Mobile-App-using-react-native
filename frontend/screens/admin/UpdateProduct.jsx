import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, defaultStyle, inputStyling } from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { Button, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { inputOption } from "../UpdateProfile";
import SelectComponents from "../../components/SelectComponents";
import {
  useMessageAndErrorFromOther,
  useSetCategories,
} from "../../utils/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getProductDetails } from "../../redux/actions/productActions";
import { updateProduct } from "../../redux/actions/otherActions";

const UpdateProduct = ({ navigation, route }) => {
  const {product,loading} = useSelector(state => state.product)
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);

  // console.log(product)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const [id] = useState(route.params.id);

  const submitHandler = () => {
    console.log(name, description, price, stock, categoryID);

    dispatch(updateProduct(id,name,description,price,stock,categoryID))
  };

  const loadingOther = useMessageAndErrorFromOther(
    dispatch,
    navigation,
    "adminpanel"
  );

  useEffect(() => {
 
    dispatch(getProductDetails(id))
  },[dispatch,id,isFocused]);


  useEffect(() => {
    if(product) {
      setName(product.name)
      setDescription(product.description)
      setPrice(String(product.price))
      setStock(String(product.stock))
      setCategory(product.category?.category)
      setCategoryID(product.category?._id)
    }
  },[product])

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.colors_5 }}>
        <Header back={true} />

        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={styles.heading}>Update Product</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <>
            <ScrollView
              style={{
                padding: 20,
                elevation: 10,
                borderRadius: 10,
                backgroundColor: colors.color_3,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  height: 650,
                }}
              >
                <Button
                  onPress={() =>
                    navigation.navigate("productimages", {
                      id,
                      images:product.images,
                    })
                  }
                  textColor={colors.color_1}
                >
                  Manage Images
                </Button>

                <TextInput
                  {...inputOption}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  {...inputOption}
                  placeholder="Description"
                  value={description}
                  onChangeText={setDescription}
                />
                <TextInput
                  {...inputOption}
                  placeholder="price"
                  keyboardType="number-pad"
                  value={price}
                  onChangeText={setPrice}
                />
                <TextInput
                  {...inputOption}
                  placeholder="Stock"
                  keyboardType="number-pad"
                  value={stock}
                  onChangeText={setStock}
                />

                <Text
                  style={{
                    ...inputStyling,
                    textAlign: "center",
                    borderRadius: 3,
                    textAlignVertical: "center",
                  }}
                  onPress={() => setVisible(true)}
                >
                  {category}
                </Text>

                <Button
                  textColor={colors.color_2}
                  style={{
                    backgroundColor: colors.color_1,
                    margin: 20,
                    padding: 6,
                  }}
                  
                  onPress={submitHandler}
                  loading={loadingOther}
                  disabled={loadingOther}
                >
                  Create
                </Button>
              </View>
            </ScrollView>
          </>
        )}
      </View>
      <SelectComponents
        categories={categories}
        setCategoryID={setCategoryID}
        setCategory={setCategory}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default UpdateProduct;

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
