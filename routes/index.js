var express = require('express');
var router = express.Router();
var User=require("../models/User")

/* GET home page. */
router.get('/', function(req, res) {
 res.send("hello user")
});

router.post("/signup",)


router.get('/login',function(req,res){
  var username=req.query.username
  var password=req.query.password
  console.log(username,password)
  res.json({islogin:"successfully"})
})

module.exports = router;
