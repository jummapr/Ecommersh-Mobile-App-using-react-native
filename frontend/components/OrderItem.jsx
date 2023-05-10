import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";

const OrderItem = ({

    id,
    price,
    address,
    orderedOn,
    status,
    paymentMethod,
    updateHandler,
    admin=false,
    loading,
    i=0,


}) => {
  return (
    <View style={{...styles.container, backgroundColor:i%2 === 0 ? colors.color_2: colors.color_3}}>
      <Text style={{...styles.text,backgroundColor:i%2 === 0 ? colors.color_3: colors.color_1}}>Id - #{id}</Text>


      <TextBox title={"Address"} value={address} i={i}/>
      <TextBox title={"Ordered On"} value={orderedOn} i={i}/>
      <TextBox title={"Price"} value={price} i={i}/>
      <TextBox title={"status"} value={status} i={i}/>
      <TextBox title={"paymentMethod"} value={paymentMethod} i={i}/>

      {
        admin && (
            <Button icon={"update"} mode="contained" style={{width:120,alignSelf:"center",marginTop:10, backgroundColor:i%2 === 0 ? colors.color_3: colors.color_2 }} onPress={() => updateHandler(id)} loading={loading} disabled={    loading} textColor={i%2 === 0 ? colors.color_2 :  colors.color_3 }>
                Update
            </Button>
        )
      }
    </View>
  );
};

const TextBox = ({title,value,i}) => (
    <Text style={{marginVertical:6,color:i%2 === 0 ? colors.color_3: colors.color_2}}>

        <Text style={{fontWeight:"900"}}>{title} - </Text>
        {title === "Price" ?  "₹": ""}
        {value}
    </Text>
)


const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius:10,
        marginVertical:10,
        elevation: 5,
    },
    text: {
        color:colors.color_2,
        fontSize:16,
        fontWeight: "900",
        marginHorizontal: -20,
        marginTop:-20,
        marginBottom: 10,
        paddingVertical:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        paddingHorizontal:20,

        
    }
});

    export default OrderItem