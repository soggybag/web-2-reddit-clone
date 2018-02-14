const mocha = require('mocha')
// const chai = require('chai').
const expect = require('chai').expect
const { Item, getCart, addItem } = require('../cart')

let testPost;

before(() => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>")
  // testPost = new Post({ name: "TESTING" });
  // return testPost.save();
});

beforeEach(() => {
  console.log('--------------------------');
})

after(() => {
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<");
  // return testPost.remove();
});

describe('testing Shopping Cart items', () => {
  beforeEach(() => {
    console.log('........................');
  })

  it('Should create a new Item with name and price', () => {
    const item = new Item('Apple', 1.99)
    expect(item.name).to.be.a('string');
    expect(item.price).to.be.a('number');
    expect(item.name).to.be.equal("Apple")
    expect(item.price).to.be.equal(1.99)
  });

  it('Should return an array containing all items in cart', () => {
    const cart = getCart();
    expect(cart).to.be.a('array');
    expect(cart).to.have.lengthOf(0);
    cart.push('A');
    expect(cart).to.have.lengthOf(1);
  });

  it('Should add a new item to the shopping cart', () => {
    const cart = getCart();
    addItem("apple", 5)
    const cart2 = getCart()

    expect(cart2).to.have.lengthOf(cart.length + 1);
    expect(cart2.length).to.equal(cart.length + 1);
  });

  it('Should return the number of items in the cart');
  it('Should remove items from cart');
  // Stretch challenges
  it('Should update the count of items in the cart');
  it('Should remove an item when its count is 0');
  it('Should return the total cost of all items in the cart');
})

describe('testing posts', () => {
  beforeEach(() => {
    console.log('===========================');
  })
  it('should fetch an array of posts', () => {
    
  });
  it('should add a post');
  it('should remove a post');
});

describe('testing users', () => {
  it('should fetch an array of users');
  it('should add a user');
  it('should remove a user');
});
