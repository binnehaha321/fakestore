import request from '../../axios/index';

export const fetchAllCart = async(user) => { // => list: []

    // helper function
        // get every single product data and add to a list
    async function fetchProductData(cartItem){ // => list: []  
        let products = [];
        const productsLength = cartItem.products.length;
        for (let i = 0; i  < productsLength; i++)
        {   
            // cartItem.products -> [{0: {productId: 1, quantity: 4}  ,1: ...}]
            const productId = cartItem.products[i].productId;
            const quantity = cartItem.products[i].quantity;
            let {data} = await request.get(`/products/${productId}`);
            //data -> {id: , title: '', price: '', description: '', category: '', …}
            data['quantity'] = quantity;
            products.push(data);
            
        }

        return products;
    }
    // merge quantity of those products which has the same id 
    function mergeProduct(objects){ // => list: []
        let mergeObject = new Map();
        objects.forEach(obj =>{
            const key = obj.id;
            if (!mergeObject.has(key)) 
            {
                mergeObject.set(key, {...obj});
            }
            else
            {
                mergeObject.set(key,{
                    ...obj,
                    quantity: mergeObject.get(key).quantity + obj.quantity,
                })
            }
        })
        return Array.from(mergeObject.values());

    }

    const {data} = await request.get("/carts");       // [{id: 1, userId: 1, date: '2020-03-02T00:00:00.000Z', products: Array(3), __v: 0}, ...]
    const userCart = data.filter((item) => item.userId  === user.id)  
    let productData = [];
    for (let i = 0; i < userCart.length; i++)
    {
        let products = await fetchProductData(userCart[i]);
        productData = productData.concat(products);
    }

    productData = mergeProduct(productData);

    console.log(productData);
    return productData;
}