class Product{
    constructor( id, title, price, description, thumbnails = [], code, stock, category, status = true){
        //validate if every parameter is not null
        console.log("Product data: ", id, title, price, description, thumbnails, code, stock, category, status);
        if(!id || !title || !price || !description || !code || !stock || !category || !status){
            console.log("All parameters are required [id, title, price, description, code, stock, category, status]");
            throw new Error("All parameters are required [id, title, price, description, code, stock, category, status]");
        }
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnails = thumbnails;
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.status = status;
    }
}

export default Product;