import React from "react";
import { Text, View } from "react-native";
function Heading({text1="our",text2="Products",containerStyle}) {
  return (
    <>
      <View style={ containerStyle}>
        <Text style={{ fontSize: 25 }}>{text1}</Text>
        <Text style={{ fontSize: 25, fontWeight: "900" }}>{text2}</Text>
      </View>
    </>
  );
}

export default Heading;
