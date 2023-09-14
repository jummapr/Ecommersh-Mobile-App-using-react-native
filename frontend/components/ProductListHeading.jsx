import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/styles";

const ProductListHeading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Image</Text>
      <Text style={styles.text}>Price</Text>
      <Text style={{ ...styles.text, width: null, maxWidth: 120 }}>Name</Text>
      <Text style={{...styles.text,width:60,}}>category</Text>
      <Text style={styles.text}>Stock</Text>
    </View>
  );
};

export default ProductListHeading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color_3,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  text: {
    width: 40,
    color: colors.color_2,
    fontWeight: "900",
    textTransform: "capitalize"
  },
});
