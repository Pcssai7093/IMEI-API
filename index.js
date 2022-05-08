const express = module.require("express");
const app = express();
app.set('view engine','ejs');
const bodyparser=module.require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));
const port=process.env.PORT||5000;

app.listen(port, () => {
  console.log("server started at 3000");
});

app.get('/',(req,res)=>{
  res.render('home');
});

//  IMEI API
// for easy testing imei is passed as a route parameter
app.get("/VerifyIMEI/:imei", (req, res) => {
  const imei = req.params.imei;
  let flag = false;
  let sum = 0;

  if (imei.length == 15) {
    for (let i = 0; i < imei.length - 1; i++) {

      if (i % 2 == 0) {
        sum = sum + parseInt(imei.charAt(i));
      } else {
        let digit = parseInt(imei.charAt(i) * 2);
        while (digit != 0) {
          sum += digit % 10;
          digit = Math.floor(digit / 10);
        }
      }
    }
    let ld = imei.charAt(imei.length - 1);
    sum += parseInt(ld);

    if (sum % 10 == 0) {
      flag = true;
    }
  } else {
    flag = false;
    res.send("invalid imei");
  }

  if (flag == true) {
    res.send("VALID IMEI");
  } else {
    res.send("INVALID IMEI");
  }

});


app.post('/VerifyIMEIUI',(req,res)=>{
  // res.send(req.body);
  const imei = req.body.Imei;
  let flag = false;
  let sum = 0;

  if (imei.length == 15) {
    for (let i = 0; i < imei.length - 1; i++) {

      if (i % 2 == 0) {
        sum = sum + parseInt(imei.charAt(i));
      } else {
        let digit = parseInt(imei.charAt(i) * 2);
        while (digit != 0) {
          sum += digit % 10;
          digit = Math.floor(digit / 10);
        }
      }
    }
    let ld = imei.charAt(imei.length - 1);
    sum += parseInt(ld);

    if (sum % 10 == 0) {
      flag = true;
    }
  } else {
    flag = false;
    res.send("invalid imei");
  }

  if (flag == true) {
    res.send("VALID IMEI");
  } else {
    res.send("INVALID IMEI");
  }


});