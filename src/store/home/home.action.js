import request from "../../axios"
import { loadProduct, loadProductFailed, loadProductSuccess } from "./home.slice"

export const getProducts = async (dispatch) => {
  // get localstorage

  // if (!localStorage)
  dispatch(loadProduct())
  try {
    const { data } = await request(`/products`)
    dispatch(loadProductSuccess(data))
  } catch (error) {
    dispatch(loadProductFailed(error))
  }
}