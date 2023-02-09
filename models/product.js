const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(title, description, price, imageUrl, id, userId) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.imageUrl = imageUrl),
      (this._id = id ? new mongodb.ObjectId(id) : null),
      (this.userId = userId);
  }

  save() {
    const db = getDb();
    let dbOp;
    console.log("ididiididid", this._id);
    if (this._id) {
      //updating product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }
  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }
}

// Defined Modal of table
// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

module.exports = Product;
