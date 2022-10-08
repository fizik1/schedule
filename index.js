const express = require("express");
const app = express();
const axios = require("axios");
const fs = require('fs')


app.get("/", async (req, res) => {
  var newItems = [];
  var pageCount=0
  await fs.readFile("data.json", (err, data)=>{
    // console.log(JSON.parse(data));
    res.sendStatus(data)
    var newItems = JSON.parse(data)
  })

  console.log("bajarildi");
  // console.log(newItems);

});

app.listen(3000, () => {
  console.log("port 3000");
});



  // await axios.get("https://student.samdu.uz/rest/v1/data/schedule-list", {
  //     headers:{
  //       accept:"application/json",
  //       Authorization:"Bearer dpbJRafHgNO28kk30iU_0XdAgOziHWTo"
  //     }
  //   }).then(javob=>{
  //     pageCount=javob.data.data.pagination.pageCount
  //     console.log(javob.data.data.items[0]);
  //   })
  // for(let i=0;i<=pageCount;i++){
  //   await axios.get("https://student.samdu.uz/rest/v1/data/schedule-list", {
  //     headers:{
  //       accept:"application/json",
  //       Authorization:"Bearer dpbJRafHgNO28kk30iU_0XdAgOziHWTo"
  //     },
  //     params:{
  //       year:2022,
  //       page:i
  //     }
  //   }).then(javob=>{
  //     // console.log(javob.data.data.items);
  //     console.log(i);
  //     javob.data.data.items.forEach(element => {
  //       newItems.push(element)
  //     });
  //   })
    
  // }

  // fs.writeFile("data.json", JSON.stringify(newItems), (err) => {
  //   if (err)
  //     console.log(err);
  //   else {
  //     console.log("File written successfully\n");
  //     console.log("The written has the following contents:");
  //     console.log(fs.readFileSync("data.json", "utf8"));
  //   }
  // });
  // var faculties = []
  // newItems.forEach(item=>{
  //   // console.log(faculties[item.faculty.id]);
  //   if(faculties[0]){
  //     console.log("b");
  //     faculties.map((item1, index)=>{
  //       console.log(item1.id);
  //       // if(item.faculty.id!=item1.id){
  //       //   console.log("c");
  //       //   faculties.push({id:item.faculty.id, name:item.faculty.name})
  //       // }
  //     })
  //   }else{
  //     console.log("a");
  //     faculties.push({id:item.faculty.id, name:item.faculty.name})
  //   }
  // })

  // console.log(faculties);
