import { useNavigation } from "@react-navigation/native";
import {
  BackHandler,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { colors } from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import { Headline, Searchbar } from "react-native-paper";
import { useEffect } from "react";

// searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         setActiveSearch={setActiveSearch}
//         products={products}

const SearchModal = ({
  searchQuery,
  setSearchQuery,
  setActiveSearch,
  products=[],
}) => {
  const navigate = useNavigation();
  const backAction = () => {
    setSearchQuery("")
    setActiveSearch(false);
    return true

  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress",backAction)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress",backAction)

    }
  })

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        zIndex: 100,
        backgroundColor: colors.color_2,
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <SafeAreaView>
        <Searchbar
          placeholder="search..."
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={{
            marginTop: 20,
          }}
        />

        <ScrollView>
          <View
            style={{
              paddingVertical: 40,
              paddingHorizontal: 10,
            }}
          >
            {products.map((i) => (
              <SearchItem
                key={i._id}
                imgSrc={i.images[0]?.url}
                name={i.name}
                price={i.price}
                handler={() =>
                  navigate.navigate("productdetails", { id: i._id })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const SearchItem = ({ imgSrc, name, price, handler }) => (
  <TouchableOpacity onPress={handler}>
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.color_2,
        elevation: 5,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        marginVertical: 30,
      }}
    >
      <Image
        source={{
          uri: imgSrc,
        }}
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          resizeMode: "contain" ,
          top: -15,
          left: 10,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      <View style={{width: "80%",paddingHorizontal: 30}}>
        <Text numberOfLines={1 }>{name}</Text>
        <Headline numberOfLines={1} style={{
          fontWeight: "900",

        }}>₹{price}</Headline>
      </View>
    </View>
  </TouchableOpacity>
);

export default SearchModal;

const styles = StyleSheet.create({});
