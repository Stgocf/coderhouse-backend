// class for cart, with id and an array of products
class Cart{
    constructor(id, products = []){
        //validate if every parameter is not null
        //console.log("Cart data: ", id, products);
        if(!id){
            throw new Error("All parameters are required [id]");
        }
        this.id = id;
        this.products = products;
        // note: products array is an array of objects with the following structure:
        // {product: 1, , quantity: 10}
        // where product is the id of the product and quantity is the quantity of the product in the cart
        // when adding a product to the cart, the quantity is 1 by default
        // if the product already exists in the cart, the quantity is increased by 1
    }
}

//exporrt class
export default Cart;
