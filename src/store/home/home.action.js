import request from "../../axios"
import { loadProduct, loadProductFailed, loadProductSuccess } from "./home.slice"


export const getProducts = async (dispatch) => {
  // get localstorage
    const productsFromLocalStored = localStorage.getItem("products");
    if (productsFromLocalStored !== null)
    {
      dispatch(loadProduct());
      try{
        dispatch(loadProductSuccess(JSON.parse(productsFromLocalStored)))
      }
      catch(err)
      {
        dispatch(loadProductFailed(err));
      }
    }
    else{
      // if (!localStorage)
      dispatch(loadProduct())
      try {
        const { data } = await request(`/products`)
        dispatch(loadProductSuccess(data))
      } catch (error) {
        dispatch(loadProductFailed(error))
      }
    }

}