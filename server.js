const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const next = require("next");
const cookieParser = require("cookie-parser");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      handle(req, res);
    });

    server.post("/api/login", (req, res) => {
      request.post("http://localhost:3001/login", (error, response, body) => {
        if (error) {
          console.log("error: ", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end();
        } else {
          const responseJSON = JSON.parse(body);
          console.log("responseJSON: ", responseJSON);
          const { authToken, refreshToken } = responseJSON;
          const claims = Buffer.from(
            authToken.split(".")[1],
            "base64"
          ).toString();
          console.log("claims: ", claims);
          const responseHeaders = {
            "Content-Type": "application/json",
            "set-cookie": [
              `authToken=${authToken}; Path=/; HttpOnly;`,
              `refreshToken=${refreshToken}; Path=/; HttpOnly;`,
            ],
          };
          res.writeHead(200, responseHeaders);
          res.end(claims);
        }
      });
    });

    server.post("/api/logout", (req, res) => {
      const responseHeaders = {
        "Content-Type": "application/json",
        "set-cookie": [
          `authToken=''; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`,
          `refreshToken=''; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`,
        ],
      };
      res.writeHead(204, responseHeaders);
      res.end();
    });

    server.post("/api/refresh", (req, res) => {
      request.post("http://localhost:3001/refresh", (error, response, body) => {
        if (error) {
          console.log("error: ", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end();
        } else {
          const responseJSON = JSON.parse(body);
          console.log("responseJSON: ", responseJSON);
          const { authToken, refreshToken } = responseJSON;
          const claims = Buffer.from(
            authToken.split(".")[1],
            "base64"
          ).toString();
          console.log("claims: ", claims);
          const responseHeaders = {
            "Content-Type": "application/json",
            "set-cookie": [
              `authToken=${authToken}; Path=/; HttpOnly;`,
              `refreshToken=${refreshToken}; Path=/; HttpOnly;`,
            ],
          };
          res.writeHead(200, responseHeaders);
          res.end(claims);
        }
      });
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
