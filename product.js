class Product{
    constructor( id, title, price, description, thumbnail, code, stock){
        //validate if every parameter is not null
        console.log("Product data: ", id, title, price, description, thumbnail, code, stock);
        if(!id || !title || !price || !description || !thumbnail || !code || !stock){
            throw new Error("All parameters are required [id, title, price, description, thumbnail, code, stock]");
        }
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

export default Product;