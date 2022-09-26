const accessModel = require("../models/accessModel");

function checkAccessGlobaly(req, res) {
  const type = req.params.type;
  const name = req.params.name;
  const process = req.params.process;
  
  if (type == undefined) {
    res.status(400).send("accessType is undefined!");
  } else if (name == undefined) {
    res.status(400).send("accessName is undefined!");
  } else if (process == undefined) {
    res.status(400).send("process is undefined");
  } else {
    accessModel
      .checkAccessGlobaly(type, name, process)
      .then(function (result) {
          res.json(result);
          console.log("on accessController");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error executing the query!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function addAccessGlobal(req, res) {
  const type = req.body.typeServer;
  const name = req.body.nameServer;
  const process = req.body.processServer;

  if (type == undefined) {
    res.status(400).send("accessType is undefined!");
  } else if (name == undefined) {
    res.status(400).send("accessName is undefined!");
  } else if (process == undefined) {
    res.status(400).send("process is undefined");
  } else {
    accessModel
      .addAccessGlobal(type, name, process)
      .then(function (result) {
        res.json(result);
        console.log("on accessController");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error executing the query!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function addAccessCompany(req, res) {
  const operationId = req.body.operationIdServer;
  const company = req.body.companyServer;

  if (operationId == undefined) {
    res.status(400).send("operationId is undefined!");
  } else if (company == undefined) {
    res.status(400).send("company is undefined!");
  } else {
    accessModel
      .addAccessCompany(operationId, company)
      .then(function (result) {
        res.json(result);
        console.log("on accessController");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error executing the query!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function showAccess(req, res) {
  const company = req.params.idCompany;

  if (company == undefined) {
    console.log("company undefined on showAccess");
    return false;
  } else {
    accessModel
      .showAccess(company)
      .then(function (result) {
        res.json(result);
        console.log("on accessController");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error executing the query!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function deleteAccessCompany(req, res) {
  const company = req.params.fkCompany;
  const access = req.params.fkAccess;

  accessModel
    .deleteAccessCompany(company, access)
    .then(function (result) {
      res.json(result);
      console.log("on accessController");
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete company access has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

function deleteAccessFamily(req, res) {
  const company = req.params.fkCompany;
  const access = req.params.fkAccess;

  accessModel
    .deleteAccessFamily(company, access)
    .then(function (result) {
      res.json(result);
      console.log("on accessController");
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete family access has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

function verifyGlobalAccessUsing(req, res) {
  const access = req.params.idAccess;

  if (access == undefined) {
    console.log("access undefined on verifyGlobalAccessUsing");
    return false;
  } else {
    accessModel
      .verifyGlobalAccessUsing(access)
      .then(function (result) {
        res.json(result);
        console.log("on accessController");
      })
      .catch(function (error) {
        console.log(error);
        console.error(
          "\nThere was an error executing the query!\nERROR: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function deleteAccessGlobal(req, res) {
  const access = req.params.idAccess;

  accessModel
    .deleteAccessGlobal(access)
    .then(function (result) {
      res.json(result);
      console.log("on accessController");
    })
    .catch(function (error) {
      console.log(error);
      console.log("Delete global access has been failed: ", error.sqlMessage);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  checkAccessGlobaly,
  addAccessGlobal,
  addAccessCompany,
  showAccess,
  deleteAccessCompany,
  deleteAccessFamily,
  verifyGlobalAccessUsing,
  deleteAccessGlobal,
};