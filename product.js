class Product{
    constructor( id, name, price, description, thumbnail, code, stock){
        //validate if every parameter is not null
        if(!id || !name || !price || !description || !thumbnail || !code || !stock){
            throw new Error("All parameters are required [name, price, description, thumbnail, code, stock]");
        }
        this.id = id;
        this.title = name;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

export default Product;