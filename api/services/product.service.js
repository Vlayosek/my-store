const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');


class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
        this.products.push({
          // id: faker.number.int({ min: 1, max: 100 }),
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: faker.number.int({ min: 100, max: 1000 }),
          image: faker.image.url(),
          isBlocked: faker.datatype.boolean(),
        });
    }
  };

  async create( data ){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    });
  }

  async findOne(id){

    const product = this.products.find(product => product.id === id);
    if(!product){
      throw boom.notFound('Product not found');
    }

    if(product.isBlocked){
      throw boom.conflict('Product is blocked');
    }

    return product
  }

  async update( id, changes ){
    const index = this.products.findIndex(product => product.id === id);

    if(index === -1){
      throw boom.notFound('Product not found');
    }

    const target = this.products[index];
    this.products[index] = {
      ...target,
      ...changes
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(product => product.id === id);

    if(index === -1){
      throw boom.notFound('Product not found with boom');
    }

    this.products.splice(index, 1);
    return true
  }

}

// module.exports = new ProductsService();
module.exports = ProductsService;
