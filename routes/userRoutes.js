/**
 * Importing Express to instantiated a rotuer to define routes .
 */
const express = require("express")
const router = express.Router();

 /**
  * Importing controllers from user controllers.
  */
const {createUser} = require('../controllers/userController/createUser')

 /**
  * "/create" - route is used to create a user. It uses post method.
  */
router.route('/create').post(createUser);

module.exports =  router;