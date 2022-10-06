const express = require("express");
const app = express();
const axios = require("axios");

app.get("/", async (req, res) => {
  // res.send(new Date(1630886400*1000))
  let newItems = [];
  for(let i=0;i<=50;i++){
    console.log(i);
  }
  
  // console.log(response);
  // newItems.push(response.data.data.items)
  // response.data.data.items.forEach(element => {
  //   newItems.push(element)
  // });
  // console.log(newItems);
  // console.log(response(3))
  // res.send(JSON.stringify(newItems))
});

app.listen(3000, () => {
  console.log("port 3000");
});
