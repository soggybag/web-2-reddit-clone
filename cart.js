const cart = []

const Item = function Item(name, price, qty = 1) {
  this.name = name
  this.price = price
  this.qty = qty
}
module.exports.Item = Item




module.exports.getCart = () => {
  // should return an array of Items
  return cart.slice() // Shallow copy
}

module.exports.addItem = (name, price) => {
  const addedItem = new Item(name, price);
  cart.push(addedItem);
  // return getCart()
}

// Deep Copy Object
// const a = {a:'a', b:'b', c:{n:11}}
//
// const b = JSON.parse(JSON.stringify(a))

// Doesn't work with
// const a = {a:'a', b:'b', c:{n:11}, f:function(){}}


















// var i1 = new Item("A", 1.00)

// class Item {
//   constructor(name, price, qty = 1) {
//     this.name = name
//     this.price = price
//     this.qty = qty
//   }
// }

// var i2 = new Item("B", 1.00)
//
// function makeItem(name, price, qty = 1) {
//   return { item, price, qty }
// }

// var i3 = makeItem("B", 1.00)




// function scope

// var i = -1
//
// function test() {
//   var i = 11
//   console.log("Test: ", i)
// }
//
// test()
//
//
// console.log("????: ", i)
//
// for (var i = 0; i < 5; i++) {
//   console.log("for:", i)
// }
//
// console.log("Outside:", i)
//



// block scope

// let i = -1
//
// function test() {
//   let i = 11
//   console.log("Test: ", i)
// }
//
// test()
//
//
// console.log("????: ", i)
//
// for (let i = 0; i < 5; i++) {
//   console.log("for:", i)
// }
//
// console.log("Outside:", i)
//
