import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const ButtonBox = ({icon,text,handler,reverse=false,loading=false,}) => {
  return (
    <TouchableOpacity style={{

      backgroundColor: reverse? colors.color_1 :  colors.color_3,
      height: 80,
      width: 80,
      borderRadius: 20,
      alignItems: "center",

    }} activeOpacity={1} onPress={() => handler(text)} disabled={loading}>

      
    <Avatar.Icon size={50} color={colors.color_2} icon={icon} style={{backgroundColor: reverse? colors.color_1 :  colors.color_3, }} />
        <Text style={{color:colors.color_2,textAlign:"center",}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBox

const styles = StyleSheet.create({});
