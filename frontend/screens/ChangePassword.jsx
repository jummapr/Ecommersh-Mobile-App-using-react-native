import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { colors, defaultStyle, inputStyling } from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Headers from "../components/Header";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/actions/otherActions";
import { useMessageAndErrorFromOther } from "../utils/hooks";

const inputOption = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color_1,
};

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorFromOther(dispatch);

  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    setOldPassword("");

    setNewPassword("");
  };
  return (
    <>
      <View style={defaultStyle}>
        <Headers back={true} />
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={styles.heading}>Change Password</Text>
        </View>

        <View style={styles.container}>
          <TextInput
            {...inputOption}
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={true}
          />

          <TextInput
            {...inputOption}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
          <Button
            loading={loading}
            onPress={submitHandler}
            textColor={colors.color_2}
            disabled={oldPassword == "" || newPassword == ""}
            style={styles.btn}
          >
            Change Password
          </Button>
        </View>
      </View>
    </>
  );
};
export default ChangePassword;

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
    flex: 1,
    padding: 20,
    backgroundColor: colors.color_3,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 10,
  },
  forgetText: {
    color: colors.color_2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
    fontWeight: "100",
  },
  btn: {
    backgroundColor: colors.color_1,
    margin: 20,
    padding: 6,
  },
  or: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color_2,
  },
  link: {
    alignSelf: "center",
    fontSize: 18,
    color: colors.color_2,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
