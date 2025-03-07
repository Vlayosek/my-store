const { faker } = require('@faker-js/faker');
const { simpleFaker } = require('@faker-js/faker');
class ProductService {
  constructor() {
    this.products = [];
    this.generateProduct();
  }
  getProducts() {
    this.products = [];
  }

  generateProduct() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: simpleFaker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
      });
    }
  }

  create( product ) {
    const newProduct = {
      id: simpleFaker.string.uuid(),
      ...product,
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne( id ) {
    return this.products.find((product) => product.id === id);
  }

  update( id, changes ) {

    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }

    const prevProduct = this.products[index];
    this.products[index] = {
      ...prevProduct,
      ...changes,
    };

  }

  /* update( id ) {

    return this.products.map((product) => {
      console.log(product);

      if (product.id === id) {
        return {
          ...product,
          ...id,
        };
      }
      return product;
    });

  } */

  delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
  }
}

module.exports = ProductService;

/* const data = {
  products: [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://via.placeholder.com/150',
    },
  ],
}; */
