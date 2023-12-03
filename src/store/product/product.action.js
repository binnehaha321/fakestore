import request from '../../axios';
import { updateProduct, updateProductSuccess, updateProductFailed } from '../../store/product/product.slice';
export const fetchProducts = async () => {
    return await request.get("/products")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        throw error; 
      });
  };
  
export const fetchCategoryProduct = async(category) =>{
  return await request.get(`/products/category/${category}`)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.error('Error fetching products:', error);
    throw error; 
  });
}


export function filterProduct(products, category, dispatch,limit) {
  try {
      dispatch(updateProduct())
      if (category !== "all") {
          let filtered = products.filter(product => product.category === category);
          filtered = filtered.slice(0, limit);
          dispatch(updateProductSuccess(filtered));
      }
      else {
          let filtered = products.slice(0, limit);
          dispatch(updateProductSuccess(filtered));
      }
  }
  catch (err) {
      dispatch(updateProductFailed(err));
  }
}