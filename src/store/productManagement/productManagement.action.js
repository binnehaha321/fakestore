import axios from "axios"


export const insertProductsToLocalStorage = async () => {
    try{
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data; 
        const products_data = products.map((product, index) => {
            return {
                key: product.title,
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
    

