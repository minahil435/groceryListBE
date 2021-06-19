const Grocerylist = require("../model/GroceryList");

async function getAllGroceries(req, res) {
  try {
    let allGrocerylist = await Grocerylist.find({}).sort({ priority : -1 });
    res.json({ payload: allGrocerylist });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function createList(req, res) {
  console.log(req.body);

  try {
    let createdGroceryList = new Grocerylist({
        grocery: req.body.grocery
    });

    let savedlist = await createdGroceryList.save();
    res.json({ payload: savedlist });

  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function updateList(req, res) {
  try {
    let updatedGrocerylist = await Grocerylist.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    res.json({ payload: updatedGrocerylist });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function deleteList(req, res) {
  try {
    let deletedGrocerylist = await Grocerylist.findByIdAndRemove(req.params.id);

    res.json({ payload: deletedGrocerylist });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function sortGroceryByDate(req, res) {
  try {
    let sort = req.query.sort;
    let sortOrder = sort === "desc" ? -1 : 1;

    let foundGrocery = await Grocerylist.find({}).sort({ Date: sortOrder });

    res.json({ payload: foundGrocery });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function sortGroceryByDone(req, res) {
  try {
    let isPurchased = req.query.isPurchased;
    let isPurchasedOrder = isPurchased === "true" ? true : false;

    let sortByDate = req.query.sort ? req.query.sort : null;
    let finalSort;
    if (!sortByDate) {
      finalSort = null;
    } else {
      finalSort = sortByDate === "asc" ? 1 : -1;
    }

    let foundGrocery = await Grocerylist.find({ purchased: isPurchasedOrder }).sort({
      Date: finalSort,
    });

    res.json({ payload: foundGrocery });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}


module.exports = {
    getAllGroceries,
    createList,
    updateList,
    deleteList,
    sortGroceryByDate,
    sortGroceryByDone,
};
