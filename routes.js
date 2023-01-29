const fs = require("fs");

const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    const bodyData = [];
    req.on("data", (chunk) => {
      bodyData.push(chunk);
    });

    req.on("end", () => {
      const parsedData = Buffer.concat(bodyData).toString();
      const message = parsedData.split("=")[1];
      fs.writeFile("message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};
module.exports = requestHandler;
