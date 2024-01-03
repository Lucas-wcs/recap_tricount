const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const voyageControllers = require("./controllers/voyageControllers")
const depenseControllers = require("./controllers/depenseControllers")
const voyageurControllers = require("./controllers/voyageurControllers")

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/voyage", voyageControllers.browse)
router.post("/voyage", voyageControllers.add)

router.post("/depense", depenseControllers.add)
router.get("/voyageur", voyageurControllers.browse)

module.exports = router;
