import axios from "axios";
import { server } from "../store";

export const getAllProduct = (keyword,category) => async (dispatch) => {
    try {
      dispatch({
        type: "getAllProductsRequest",
      });
  
      const { data } = await axios.get(`${server}/product/all?category=${category}&keyword=${keyword}`, {
        withCredentials: true,
      });
      // console.log(data);
      dispatch({
        type: "getAllProductsSuccess",
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: "getAllProductsFail",
        payload: error.response.data.message,
      });
    }
  };
export const getProducts = () => async (dispatch) => {
    try {
      dispatch({
        type: "getProductsRequest",
      });
  
      const { data } = await axios.get(`${server}/product/getproduct`, {
        withCredentials: true,
      });
      // console.log(data);
      dispatch({
        type: "getProductsSuccess",
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: "getProductsFail",
        payload: error.response.data.message,
      });
    }
  };
export const getAdminProduct = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAdminProductRequest",
      });
  
      const { data } = await axios.get(`${server}/product/admin`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getAdminProductSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getAdminProductFail",
        payload: error.response.data.message,
      });
    }
  };


  export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getProductDetailsRequest",
      });
  
      const { data } = await axios.get(`${server}/product/single/${id}`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getProductDetailsSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "getProductDetailsFail",
        payload: error.response.data.message,
      });
    }
  };