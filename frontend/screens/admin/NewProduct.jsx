import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, defaultStyle, inputStyling } from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { inputOption } from "../UpdateProfile";
import SelectComponents from "../../components/SelectComponents";
import { useEffect } from "react";
import {
  useSetCategories,
  useMessageAndErrorFromOther,
} from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import mime from "mime";
import { createProduct } from "../../redux/actions/otherActions";

const NewProduct = ({ navigation, route }) => {
  const loadingOther = false;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Choose Category");
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const condition = !name || !description || !price || !stock || !image;

  const submitHandler = () => {
    console.log(categoryID)
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("stock", stock);
    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop()

    });

    if(categoryID) myForm.append("category", categoryID);

    dispatch(createProduct(myForm))
  };

 const loading = useMessageAndErrorFromOther(dispatch,navigation,"adminpanel")

  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.colors_5 }}>
        <Header back={true} />

        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={styles.heading}>New Product</Text>
        </View>
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
                <View
                  style={{
                    width: 80,
                    height: 80,
                    alignSelf: "center",
                    marginBottom: 20,
                  }}
                >
                  <Avatar.Image
                    size={80}
                    style={{ backgroundColor: colors.color_1 }}
                    source={{
                      uri: image ? image : null,
                    }}
                  />

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("camera", { newProduct: true })
                    }
                  >
                    <Avatar.Icon
                      icon={"camera"}
                      size={30}
                      color={colors.color_3}
                      style={{
                        backgroundColor: colors.color_2,
                        position: "absolute",
                        bottom: 0,
                        right: -5,
                      }}
                    />
                  </TouchableOpacity>
                </View>

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
                  value={stock}
                  keyboardType="number-pad"
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
                  loading={loading}
                  disabled={condition || loading}
                >
                  Update
                </Button>
              </View>
            </ScrollView>
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

export default NewProduct;
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
