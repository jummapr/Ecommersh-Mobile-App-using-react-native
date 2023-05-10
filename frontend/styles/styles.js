import {StyleSheet,Platform,StatusBar} from 'react-native'

export const colors = {
    color_1: '#c70049',
    color_1_light: 'rgba(227,25,99,1)',
    color_1_light_2: 'rgba(199,0,73,0.8)',
    color_2 :"white",
    color_3: "rgb(45,45,45)",
    colors_4: "transparent",
    colors_5: "#f2f2f2",
    colors_6: "#f7f7f7",
}

export const defaultStyle = StyleSheet.create({
    padding: 35,
    paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex : 1,
    backgroundColor: colors.color_2,


})


export const inputStyling = StyleSheet.create({
    height: 50,
    backgroundColor: colors.color_2, 
    marginVertical : 10,
    marginHorizontal : 20 
})


