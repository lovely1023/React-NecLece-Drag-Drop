const express = require("express");
const router = express.Router();
const imgGenController = require("./controller/imgGenerate.controller");

let routes = (app) => {

  router.get('/api/necklacedownload', imgGenController.downloadNecklace);

  app.use(router);
};

module.exports = routes;
