import { StyleSheet,TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { colors } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const Header = ({ back, emptyCart = false }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const emptyCartHandler = () => {
   dispatch({
    type: "clearCart",
    
   })
  };

  return (
    <>
      {back && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 20,
            top: 40,
            zIndex: 10,
          }}
          onPress={() => navigate.goBack()}
        >
          <Avatar.Icon
            style={{
              backgroundColor: colors.colors_4,
            }}
            icon={"arrow-left"}
            color={
                route.name === "productdetails" ? colors.color_2 : colors.color_3
              }
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          top: 40,
          zIndex: 10,
        }}
        onPress={emptyCart ? emptyCartHandler : () => navigate.navigate("cart")}
      >
        <Avatar.Icon
          style={{
            backgroundColor: colors.colors_4,
          }}
          icon={emptyCart ? "delete-outline" : "cart-outline"}
          color={
            route.name === "productdetails" ? colors.color_2 : colors.color_3
          }
        />
      </TouchableOpacity>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({});
