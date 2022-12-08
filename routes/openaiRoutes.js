const express = require("express");
const { generateimage } = require("../controllers/openaiControllers");
const router = express.Router();

// [x] create route for post request (openai/generateimage)
// [] go back and add controller function

router.post("/generateimage", generateimage);

module.exports = router;

// test in postman: http://localhost:5000/openai/generateimage

/*
router.post("/generateimage", (req, res) => {
  // the reason I did this was to go inside postman and ensure things were properly setup before moving to the next 
  res.status(200).json({
    success: true,
  });
});

&& 

router.post("/generateimage", generateimage); 

== 

THE SAME THING


*/
