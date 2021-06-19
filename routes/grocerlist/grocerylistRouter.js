var express = require('express');
var router = express.Router();

const {
  getAllGroceries,
  createList,
  updateList,
  deleteList,
  sortGroceryByDate,
  sortGroceryByDone,
} = require("./controller/groceryController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(true);
});

router.get("/get-all-groceries", getAllGroceries);
router.post("/create-grocery", createList);
router.put("/update-grocery-by-id/:id", updateList);
router.delete("/delete-grocery-by-id/:id", deleteList);

router.get("/get-grocery-by-sort", sortGroceryByDate);
router.get("/get-grocery-by-done", sortGroceryByDone);

 module.exports = router;