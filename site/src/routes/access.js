const express = require("express");
const router = express.Router();

const accessController = require("../controllers/accessController");

router.get(
  "/checkAccessGlobally/:operationName/:operationType",
  function (req, res) {
    accessController.checkAccessGlobally(req, res);
  }
);

router.post("/addAccessGlobal", function (req, res) {
  accessController.addAccessGlobal(req, res);
});

router.post("/addAccessCompany", function (req, res) {
  accessController.addAccessCompany(req, res);
});

router.get("/showAccess/:idCompany", function (req, res) {
  accessController.showAccess(req, res);
});

router.delete("/deleteAccessFamily/:fkCompany/:fkAccess", function (req, res) {
  accessController.deleteAccessFamily(req, res);
});

router.delete(
  "/deleteAccessCompany/:idCompanyOperations/:fkAccess",
  function (req, res) {
    accessController.deleteAccessCompany(req, res);
  }
);

router.get("/verifyGlobalAccessUsing/:idAccess", function (req, res) {
  accessController.verifyGlobalAccessUsing(req, res);
});

router.delete("/deleteAccessGlobal/:idAccess", function (req, res) {
  accessController.deleteAccessGlobal(req, res);
});

module.exports = router;
