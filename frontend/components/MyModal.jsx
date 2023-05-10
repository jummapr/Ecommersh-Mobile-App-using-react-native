import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";

const MyModal = ({ id, deleteHandler, navigate, setOpenModal }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
        onPress={() => setOpenModal(false)}
      >
        <Avatar.Icon
          icon={"close"}
          size={25}
          style={{
            backgroundColor: colors.color_1,
          }}
        />
      </TouchableOpacity>

      <Text
        style={styles.text}
        onPress={() => navigate.navigate("updateproduct",{id})}
      >
        Edit
      </Text>

      <Button textColor={colors.color_1} onPress={() => deleteHandler(id)}>Delete</Button>
    </View>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  container: {
    elevation:10,
    
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 100,
    backgroundColor: colors.color_2,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
