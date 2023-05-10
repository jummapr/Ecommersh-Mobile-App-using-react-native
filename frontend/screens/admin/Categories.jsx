import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, defaultStyle } from "../../styles/styles";
import Header from "../../components/Header";
import { Avatar, Button, TextInput } from "react-native-paper";
import { inputOption } from "../UpdateProfile";
import { useState } from "react";
import { useMessageAndErrorFromOther, useSetCategories } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { addCategory, deleteCategory } from "../../redux/actions/otherActions";

const categories = [
  {
    name: "Laptop",
    _id: "bjvbkvxkvnvnvgbf",
  },
  {
    name: "Laptop",
    _id: "bjfhfhhdxkvnvnvgbf",
  },
  {
    name: "Laptop",
    _id: "bjvfjjgjgvnvnvgbf",
  },
];

const Categories = ({navigation}) => {
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch()
  const isFocused = useIsFocused();

  useSetCategories(setCategories,isFocused)
 const loading = useMessageAndErrorFromOther(dispatch,navigation,"adminpanel")
  const deleteHandler = (id) => {
    dispatch(deleteCategory(id))
    console.log(`Deleting Category ${id}`);
  };
  const submitHandler = () => {
    dispatch(addCategory(category))
  };
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.colors_5 }}>
      <Header back={true} />

      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={styles.heading}>Categories</Text>
      </View>

      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color_2,
            padding: 20,
            minHeight: 400,
          }}
        >
          {categories.map((i) => (
            <CategoryCard
              name={i.category}
              id={i._id}
              key={i._id}
              loading={loading}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.container}>
        <TextInput
          {...inputOption}
          placeholder="category"
          value={category}
          onChangeText={setCategory}
        />

        <Button
          textColor={colors.color_2}
          style={{ backgroundColor: colors.color_1, margin: 20, padding: 6 }}
          disabled={!category}

          loading={loading}
          onPress={submitHandler}
        >
          Add{" "}
        </Button>
      </View>
    </View>
  );
};

const CategoryCard = ({ name, id, deleteHandler,loading }) => (
  <View style={styles.cardContainer}>
    <Text style={styles.cardText}>{name}</Text>
    <TouchableOpacity disabled={loading} onPress={() => deleteHandler(id)}>
      <Avatar.Icon
        icon={"delete"}
        size={30}
        style={{
          backgroundColor: colors.color_1,
        }}
      />
    </TouchableOpacity>
  </View>
);

export default Categories;

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
  cardContainer: {
    backgroundColor: colors.color_2,
    elevation: 5,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  container: {
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.color_3,
  },
});
