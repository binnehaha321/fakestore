import request from '../../axios';

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