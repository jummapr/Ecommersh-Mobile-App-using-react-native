import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { colors, defaultStyle, inputStyling } from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import { useMessageAndErrorFromUser } from "../utils/hooks";


const inputOption = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color_1,
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const dispatch = useDispatch();
  const loading = useMessageAndErrorFromUser(navigation,dispatch,"profile")


  const submitHandler = () => {
    dispatch(login(email, password))
  };
  return (
    <>
    <View style={defaultStyle}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.heading}>Login</Text>
      </View>

      <View style={styles.container}>
        <TextInput
          {...inputOption}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          {...inputOption}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("forgetpassword")}
          activeOpacity={0.8}
        >
          <Text style={styles.forgetText}>Forget Password</Text>
        </TouchableOpacity>

        <Button
        loading={loading}
          onPress={submitHandler}
          textColor={colors.color_2}
          disabled={email == "" || password == ""}
          style={styles.btn}
        >
          Login
        </Button>
        <Text style={styles.or}>OR</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("register")}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Footer activeRoute={"profile"} />
    </>
  );
};

export default Login;

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
    color: colors.color_2
  },
  link: {
    alignSelf: "center",
    fontSize: 18,
    color: colors.color_2,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20,

    
  }
});
