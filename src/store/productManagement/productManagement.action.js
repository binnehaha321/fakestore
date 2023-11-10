import request from '../../axios';

export const insertProductsToLocalStorage = async () => {
    try{
        const response = await request.get('/products');
        const products = response.data; 
        const products_data = products.map((product) => {
            return {
                id: product.id,
                image: product.image,
                title: product.title,
                price: product.price,
                category: product.category,
                description: product.description,
            };
            });
        localStorage.setItem("products",JSON.stringify(products_data));
        }
    catch(error){
        console.error('Error fetching products:', error);
        throw error;
    }

}
    

