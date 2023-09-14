import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { colors, defaultStyle, inputStyling } from "../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import { useEffect } from "react";
import mime from "mime";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/userActions";
import { useMessageAndErrorFromUser } from "../utils/hooks";

const inputOption = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color_1,
};

const Register = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const dispatch = useDispatch();


  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("address", address);
    myForm.append("city", city);
    myForm.append("country", country);
    myForm.append("pinCode", pinCode);

    if(avatar !== "") {
      myForm.append("file",{
        uri: avatar,
        type: mime.getType(avatar),
        name:avatar.split("/").pop()
      })
    }

    dispatch(register(myForm))
  };

  const loading = useMessageAndErrorFromUser(navigation,dispatch,"profile")

 const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";

  const disabledBtn =
    !name || !email || !password || !address || !city || !country || !pinCode;

  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);
  return (
    <>
      <View style={defaultStyle}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,
            backgroundColor: colors.color_3,
          }}
        >
          <View style={{ minHeight: 900 }}>
            <Avatar.Image
              style={{ alignSelf: "center", backgroundColor: colors.color_1 }}
              size={80}
              source={{
                uri: avatar ? avatar : defaultImg,
              }}
            />

            <TouchableOpacity onPress={() => navigation.navigate("camera", {})}>
              <Button textColor={colors.color_2}>Change Photo</Button>
            </TouchableOpacity>
            <TextInput
              {...inputOption}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              {...inputOption}
              placeholder="email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              {...inputOption}
              placeholder="password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              {...inputOption}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />

            <TextInput
              {...inputOption}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />

            <TextInput
              {...inputOption}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />

            <TextInput
              {...inputOption}
              placeholder="Pin Code"
              value={pinCode}
              onChangeText={setPinCode}
            />

            <Button
              loading={loading}
              onPress={submitHandler}
              textColor={colors.color_2}
              disabled={disabledBtn}
              style={styles.btn}
            >
              Register
            </Button>
            <Text style={styles.or}>OR</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Footer activeRoute={"profile"} />
    </>
  );
};

export default Register;

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
