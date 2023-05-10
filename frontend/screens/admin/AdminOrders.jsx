import { StyleSheet, Text, View } from "react-native";
import { colors, defaultStyle } from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import OrderItem from "../../components/OrderItem";
// import { orders } from "../Orders";
import { ScrollView } from "react-native";
import { useGetOrders, useMessageAndErrorFromOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { Headline } from "react-native-paper";
import { useDispatch } from "react-redux";
import { prosesOrder } from "../../redux/actions/otherActions";

const AdminOrders = ({navigation}) => {
  const dispatch = useDispatch();
    const processOrderLoading = useMessageAndErrorFromOther(dispatch,navigation,"adminpanel");
    const updateHandler = (id) => {
        dispatch(prosesOrder(id))
    }
  const isFocused = useIsFocused()

  const {loading,orders} = useGetOrders(isFocused,true);

  return (
    <View style={{...defaultStyle,backgroundColor:colors.colors_5}}>
      <Header back={true} />
      {/* Heading */}
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={styles.heading}>Admin Orders</Text>
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
            {orders.length > 0 ? (
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

                    admin={true}
                    updateHandler={updateHandler}
                    loading={processOrderLoading}
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

export default AdminOrders

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
