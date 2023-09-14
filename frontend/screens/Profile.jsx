import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, defaultStyle } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { loadUser, logoutUser } from "../redux/actions/userActions";
import {
  useMessageAndErrorFromOther,
  useMessageAndErrorFromUser,
} from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import mime from "mime";
import { updateProfilePicture } from "../redux/actions/otherActions";

const Profile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
  );

  const loading = useMessageAndErrorFromUser(navigation, dispatch, "login");

  const logoutHandler = () => {
    console.log("Logout...");
    dispatch(logoutUser());
  };

  const navigateHandler = (text) => {
    switch (text) {
      case "orders":
        navigation.navigate("orders");
        break;
      case "Admin":
        navigation.navigate("adminpanel");
        break;
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Sign Out":
        logoutHandler();
        break;
      case "camera":
        navigation.navigate("camera", { updateProfile: true });
        break;
      default:
        break;
    }
  };
  const isFocuses = useIsFocused();

  const loadingPic = useMessageAndErrorFromOther(
    dispatch,
    null,
    null,
    loadUser
  );

  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
      //! dispatch updatePic Here
      const myForm = new FormData();
      myForm.append("file", {
        uri: route.params.image,
        type: mime.getType(route.params.image),
        name: route.params.image.split("/").pop(),
      });

      dispatch(updateProfilePicture(myForm));
    }

    dispatch(loadUser());
  }, [route.params, dispatch, isFocuses]);

  useEffect(() => {
    if (user?.avatar) {
     setAvatar(user.avatar.url);
    }
  }, [user]);
  return (
    <>
      <View style={defaultStyle}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.heading}>Profile</Text>
            </View>
            <View style={styles.container}>
              <Avatar.Image
                source={{
                  uri: avatar,
                }}
                size={100}
                style={{ backgroundColor: colors.color_1 }}
              />

              <TouchableOpacity
                disabled={loadingPic}
                onPress={() =>
                  navigation.navigate("camera", { updateProfile: true })
                }
              >
                <Button
                  disabled={loadingPic}
                  loading={loadingPic}
                  textColor={colors.color_1}
                >
                  Change Picture
                </Button>
              </TouchableOpacity>

              <Text style={styles.name}>{user?.name}</Text>
              <Text style={{ fontWeight: "300", color: colors.color_2 }}>
                {user?.email}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"orders"}
                  icon={"format-list-bulleted-square"}
                />
                {user?.role === "admin" && (
                  <ButtonBox
                    handler={navigateHandler}
                    icon={"view-dashboard"}
                    text={"Admin"}
                    reverse={true}
                  />
                )}
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: 10,
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Password"}
                  icon={"pencil"}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={"Sign Out"}
                  icon={"exit-to-app"}
                />
              </View>
            </View>
          </>
        )}
      </View>

      <Footer />
    </>
  );
};

export default Profile;

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
  container: {
    elevation: 7,
    backgroundColor: colors.color_3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: colors.color_2,
  },
});
