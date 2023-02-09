const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

const objectId = mongodb.ObjectId;
class User {
  constructor(username, email, cart, id) {
    (this.name = username),
      (this.email = email),
      (this.cart = cart),
      (this._id = id);
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartItemIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    let updatedCartitems = [...this.cart.items];
    if (cartItemIndex >= 0) {
      newQuantity = this.cart.items[cartItemIndex].quantity + 1;
      updatedCartitems[cartItemIndex].quantity = newQuantity;
    } else {
      updatedCartitems.push({
        productId: new objectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartitems,
    };
    console.log(updatedCart, "ppp");
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new objectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new objectId(this._id) })
      .toArray();
  }
  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new objectId(this._id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
      })
      .then((result) => {
        db.collection("users").updateOne(
          { _id: new objectId(this._id) },
          { $set: { cart: { items: [] } } }
        );
      });
  }

  deleteFromCart(prodId) {
    const db = getDb();
    let updatedCartitems = this.cart.items.filter((cartItem) => {
      return cartItem.productId.toString() !== prodId.toString();
    });
    console.log(updatedCartitems, "uuuuuuuuuuuuu");
    return db
      .collection("users")
      .updateOne(
        { _id: new objectId(this._id) },
        { $set: { cart: { items: updatedCartitems } } }
      );
  }
  static findById(userid) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new objectId(userid) });
  }
}

module.exports = User;