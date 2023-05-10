import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors, defaultStyle } from "../../styles/styles";
import Header from "../../components/Header";
import { useState } from "react";
import ImageCard from "../../components/ImageCard";
import { Avatar, Button } from "react-native-paper";
import { useEffect } from "react";
import { useMessageAndErrorFromOther } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import mime from "mime";
import { deleteProductImage, updateProductImage } from "../../redux/actions/otherActions";

const ProductImages = ({ navigation, route }) => {
  const [images] = useState(route.params.images);
  const [productId] = useState(route.params.id);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const loading = useMessageAndErrorFromOther(dispatch,navigation,"adminpanel");

  const deleteHandler = (imageId) => {
    dispatch(deleteProductImage(productId,imageId))
  };
  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });

    dispatch(updateProductImage(productId, myForm));
  };
  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params.image);
      setImageChanged(true)
    }
  }, [route.params]);
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.colors_5 }}>
      <Header back={true} />
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={styles.heading}>Images</Text>
      </View>

      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color_2,
            padding: 40,
            minHeight: 400,
          }}
        >
          {images.map((i) => (
            <ImageCard
              key={i._id}
              src={i.url}
              id={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          padding: 20,
          borderRadius: 20,
          backgroundColor: colors.color_3,
        }}
      >
        <Image
          style={{
            backgroundColor: colors.color_2,
            width: 100,
            height: 100,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={{ uri: image }}
        />

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("camera", { updateProduct: true })
            }
          >
            <Avatar.Icon
              icon={"camera"}
              size={30}
              color={colors.color_3}
              style={{
                backgroundColor: colors.color_2,
                margin: 10,
              }}
            />
          </TouchableOpacity>
        </View>

        <Button
          style={{
            backgroundColor: colors.color_1,
            padding: 6,
          }}
          textColor={colors.color_2}
          loading={loading}
          onPress={submitHandler}
          disabled={!imageChanged}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

export default ProductImages;

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
