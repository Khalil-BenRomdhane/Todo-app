const express = require("express");
const fs = require("fs");
const router = express.Router();

let items = JSON.parse(fs.readFileSync("./Data/Data.json"));

router.route("/todo-items").get((req, res) => {
  console.log("get items request resolved");
  res.send(items);
});

router
  .route("/todo-items/:id")
  .put((req, res) => {
    let id = req.params.id;
    items = items.map((item) => {
      if (item.id == id) {
        return { id: id, content: req.body.content };
      } else {
        return item;
      }
    });
    fs.writeFile("./Data/Data.json", JSON.stringify(items), (err) => {
      if (err) {
        console.error(err);
      }
    });
    console.log("patch request resolved");
    res.send(items);
  })
  .delete((req, res) => {
    let id = req.params.id;
    items = items.filter((item) => {
        if (item.id == id) {
          return false;
        } else {
          return true;
        }
    })
    fs.writeFile("./Data/Data.json", JSON.stringify(items), (err) => {
      if (err) {
        console.error(err);
      }
    });
    res.send(items);
  })
  .post((req, res) => {
    items.push({"id":items.length+1,"content":req.body.content});

    fs.writeFile("./Data/Data.json", JSON.stringify(items), (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.send(items);
  });

module.exports = router;
