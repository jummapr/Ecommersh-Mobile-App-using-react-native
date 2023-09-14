import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Avatar } from "react-native-paper";
import { colors, defaultStyle } from "../styles/styles";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

const CameraComponents = ({ navigation, route }) => {
  const [hashPermission, setHashPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  console.log(route.params);
  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false)
      return alert("Permission to access gallery is required");

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(data);

    if (route.params?.newProduct)
      return navigation.navigate("newproduct", {
        image: data.assets[0].uri,
      });

    if (route.params?.updateProduct)
      return navigation.navigate("productimages", {
        image: data.assets[0].uri,
      });
    if (route.params?.updateProfile)
      return navigation.navigate("profile", {
        image: data.assets[0].uri,
      });
      else 
      return navigation.navigate("register", {
        image: data.assets[0].uri,
      });
  };

  const clickPicture = async() => {
    const data = await camera.takePictureAsync();

    if (route.params?.newProduct)
      return navigation.navigate("newproduct", {
        image: data.uri,
      });

    if (route.params?.updateProduct)
      return navigation.navigate("productimages", {
        image: data.uri,
      });
    if (route.params?.updateProfile)
      return navigation.navigate("profile", {
        image: data.uri,
      });
      else 
      return navigation.navigate("register", {
        image: data.uri,
      });
  };

  useEffect(() => {
    (async() => {
        const {status} = await Camera.requestMicrophonePermissionsAsync();
        setHashPermission(status === "granted")
    })()
  },[]);

  if(hashPermission === null) return <View />

  if(hashPermission === false) return (
    <View style={defaultStyle}>

        <Text>No Access To The Camera</Text>
    </View>
  )
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Camera
        type={type}
        style={{
          flex: 1,
          aspectRatio: 1,
        }}
        ratio={"1:1"}
        ref={(e) => setCamera(e)}
      />

      <View
        style={{
          flexDirection: "row",
          bottom: 10,
          width: "100%",
          justifyContent: "space-evenly",
          position: "absolute",
        }}
      >
        <MyIcon icon="image" handler={openImagePicker} />
        <MyIcon icon="camera" handler={clickPicture} />
        <MyIcon
          icon="camera-flip"
          handler={() => {
            setType((prevType) =>
              prevType === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        />
      </View>
    </View>
  );
};

const MyIcon = ({ icon, handler }) => (
  <TouchableOpacity onPress={handler}>
    <Avatar.Icon
      icon={icon}
      size={40}
      color={colors.color_2}
      style={{
        backgroundColor: colors.color_1,
      }}
    />
  </TouchableOpacity>
);

export default CameraComponents;

const styles = StyleSheet.create({});
