import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../redux/store";
import {getAdminProduct} from '../redux/actions/productActions'

export const useMessageAndErrorFromUser = (navigation,dispatch,navigateToo="login" ) => {
  const {loading,message,error} = useSelector((state) => state.user);


  useEffect(() => {
    if(error){
      Toast.show({
        type:"error",
        text1: error,
      });

      dispatch({
        type: "clearError"
      })
    }
    if(message){
      navigation.reset({
        index:0,
        routes:[{name: navigateToo}]
      })
      Toast.show({
        type:"success",
        text1: message,
      });
      dispatch({
        type: "clearMessage"
      })
    }
  },[error,message,dispatch]);

  return loading
};
export const useMessageAndErrorFromOther = (dispatch,navigation,navigateToo,func ) => {
  const {loading,message,error} = useSelector((state) => state.other);


  useEffect(() => {
    if(error){
      Toast.show({
        type:"error",
        text1: error,
      });

      dispatch({
        type: "clearError"
      })
    }
    if(message){
      Toast.show({
        type:"success",
        text1: message,
      });
      dispatch({
        type: "clearMessage"
      })
      navigateToo &&  navigation.navigate(navigateToo)

     func && dispatch(func())
    
    }
  },[error,message,dispatch]);

  return loading
};

export const useSetCategories = (setCategories,isFocused) => {
  useEffect(() => {
    axios.get(`${server}/product/categories`).then(res => {
      setCategories(res.data.categories)
    }).catch(err => {
      Toast.show({
        type: "error",
        text1: err.response.data.message
      })
    })
  },[isFocused]);
};

export const useGetOrders = (isFocused, isAdmin = false) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/order/${isAdmin ? "admin" : "my"}`)
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: e.response.data.message,
        });
        setLoading(false);
      });
  }, [isFocused]);

  return {
    loading,
    orders,
  };
};

export const useAdminProducts = (dispatch,isFocused,) => {
  const {products,inStock,outOfStock,error,loading} = useSelector(state => state.product)
  useEffect(() => {
    if(error){
      Toast.show({
        type:"error",
        text1: error,
      });

      dispatch({
        type: "clearError"
      })
    }
    dispatch(getAdminProduct())
  },[dispatch,isFocused,error]);

  return {
    products,
    inStock,
    outOfStock,
    loading
  }
} 
