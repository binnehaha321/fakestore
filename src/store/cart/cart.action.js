import request from '../../axios/index';

//-----------------------------------------------------------------------------------------------------------------------------------------------
// Fetch product data for a single cart item
async function fetchProductData(cartItem) {
    let products = [];
    for (const item of cartItem.products) {
        try {
            const { productId, quantity } = item;
            const { data } = await request.get(`/products/${productId}`);
            data.quantity = quantity;
            products.push(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }
    return products;
}

// Merge quantity of products with the same ID
function mergeProduct(objects) {
    const mergeObject = new Map();
    objects.forEach(obj => {
        const key = obj.id;
        if (!mergeObject.has(key)) {
            mergeObject.set(key, { ...obj });
        } else {
            mergeObject.set(key, {
                ...obj,
                quantity: mergeObject.get(key).quantity + obj.quantity,
            });
        }
    });
    return Array.from(mergeObject.values());
}

export const fetchAllCart = async (userId) => {   
    try {
        const requestUserCart = await request.get(`carts/user/${userId}`);
        const userCart = requestUserCart.data;
        console.log(userCart);

        let productData = [];
        for (const cartItem of userCart) {
            console.log(cartItem);
            const products = await fetchProductData(cartItem);
            productData = productData.concat(products);
        }

        productData = mergeProduct(productData);
        localStorage.setItem("cart", JSON.stringify(productData));
    } catch (error) {
        console.error("Error fetching user's cart:", error);
    }
};
//------------------------------------------------------------------------------------------------------------------------------------------------


    


export const calculateTotalPrice = (products) => {
    let totalPrice = 0;
    if (products && products.length > 0) {
        totalPrice = products.reduce((total, product) => total + (product.price * product.quantity), 0);
    }
    return totalPrice;
}