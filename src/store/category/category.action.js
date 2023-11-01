import request from "../../axios"
import { loadCategory, loadCategoryFailed, loadCategorySuccess } from "./category.slice"

export const getCategories = async (dispatch) => {
  try {
    dispatch(loadCategory())
    const { data } = await request('/products/categories')
    dispatch(loadCategorySuccess(data))
  } catch (error) {
    dispatch(loadCategoryFailed(error))
  }
}