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

  create( product) {
    this.products.push(product);
    return product;
  }

  find() {
    return this.products;
  }

  findOne( id ) {
    return this.products.find((product) => product.id === id);
  }

  update( id ) {

    return this.products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          ...id,
        };
      }
      return product;
    });

  }

  delete() {}
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
