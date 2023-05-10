import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/styles";

const CategoryCard = ({ name, id, key, deleteHandler }) => {
  return (
    <View style={styles.cardContainer}>
      <Text>{name}</Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.color_2,
        elevation: 5,
        margin:10,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
    }
});
