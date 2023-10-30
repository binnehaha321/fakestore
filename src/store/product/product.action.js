import request from '../../axios';

export const fetchProducts = async (limit) => {
    return await request.get("/products")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        throw error; 
      });
  };
  