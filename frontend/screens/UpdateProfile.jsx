import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { colors, defaultStyle, inputStyling } from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Headers from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/otherActions";
import { useMessageAndErrorFromOther } from "../utils/hooks";

export const inputOption = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color_1,
};

const UpdateProfile = ({ navigation }) => {

  const {user} = useSelector(state => state.user)

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [country, setCountry] = useState(user?.country);
  const [pinCode, setPinCode] = useState(user?.pinCode.toString());

  
  const dispatch = useDispatch();
  const loading = useMessageAndErrorFromOther(dispatch,navigation,"profile");


  const submitHandler = () => {
      dispatch(updateProfile(name,email,address,city,country,pinCode))
  };
  const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  
  return (
    <>
      <View style={defaultStyle}>

        <Headers back={true} />

        <View style={{ marginBottom: 20, paddingTop:70 }}>
          <Text style={styles.heading}>Edit profile</Text>
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
          <View>
            {/* <Avatar.Image
              style={{ alignSelf: "center", backgroundColor: colors.color_1 }}
              size={80}
              source={{
                uri: avatar ? avatar : defaultImg,
              }}
            /> */}

            {/* <TouchableOpacity onPress={() => navigation.navigate("camera", {})}>
              <Button textColor={colors.color_2}>Change Photo</Button>
            </TouchableOpacity> */}
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
              style={styles.btn}
            >
              Update
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
};


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


export default UpdateProfile

