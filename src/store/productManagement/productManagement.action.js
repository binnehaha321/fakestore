import request from '../../axios';

export const insertProductsToLocalStorage = async () => {
    try{
        const response = await request.get('/products');
        const products = response.data; 
        const products_data = products.map((product, index) => {
            return {
                key: product.id,
                image: product.image,
                title: product.title,
                price: product.price,
                category: product.category,
            };
            });
        localStorage.setItem("products",JSON.stringify(products_data));
        console.log("success");
        }
    catch(error){
        console.error('Error fetching products:', error);
        throw error;
    }

}
    

