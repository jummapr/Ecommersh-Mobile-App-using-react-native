import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 60-75;

const Chart = ({ inStock = 0, outOfStock = 0 }) => {
  const data = [
    {
      name: "Out Of Stock",
      population: outOfStock,
      color: colors.color_1_light,
      legendFontColor: colors.color_2,
    },
    {
      name: "In Stock",
      population: inStock,
      color: colors.color_1_light_2,
      legendFontColor: colors.color_2,
    },
  ];
  const chartConfig = {
    color: (opacity=1) => `rgba(26,255,146,${opacity})` 
  }
  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={150}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={colors.color_3}
        paddingLeft={"15"}
        absolute
      />
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
