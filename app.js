const path = require("path");
const db = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(8080);

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-type": "text/html" });
//     // var q = url.parse(req.url, true).query;
//     // var txt = q.year + " " + q.month;
//     res.write(dt.date());
//     res.end();
//   })
//   .listen(8080);

// let email = true;
// let password = true;
// let pro = function createOrder() {
//   let pro = new Promise((resolve, reject) => {
//     if (email && password) {
//       resolve("I am resolved");
//     } else {
//       reject("Please handle the promise");
//     }
//   });
//   return pro;
// };

// pro()
//   .then((data) => {
//     console.log(data, "data");
//   })
//   .catch((err) => {
//     console.log(err, "error");
//   });
// let response = fetch("https://jsonplaceholder.typicode.com/todos/1");
// response
//   .then((data) => {
//     // console.log(data.json(), "Hello");
//     return data.json();
//   })
//   .then((data) => {
//     console.log(data, "Hello2");
//   });
// console.log(response);
