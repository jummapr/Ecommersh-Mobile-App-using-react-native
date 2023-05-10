import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { Headline } from "react-native-paper";
import OrderItem from "../components/OrderItem";
import { useGetOrder, useGetOrders } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";


const Orders = () => {
  const isFocused = useIsFocused()
  const {loading,orders} = useGetOrders(isFocused);
  console.log(loading,orders)
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.colors_5 }}>
      <Header back={true} />

      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={styles.heading}>Orders</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            padding: 10,
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders && orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  orderedOn={item.createdAt.split("T")[0]}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}

                 
                />
              ))
            ) : (
              <Headline style={{ textAlign: "center" }}>No Orders yet</Headline>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Orders;

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
});
