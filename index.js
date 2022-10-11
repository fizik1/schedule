const express = require("express");
const app = express();
const { engine } = require("express-handlebars")
const axios = require("axios");
const fs = require('fs')


app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

var Items = []
var facultys = new Set()
var groups = new Set()
var days = new Set()

fs.readFile("data.json", (err, data)=>{
  Items = JSON.parse(data)
  console.log(Items[1000]);

  Items.forEach(element => {
    facultys.add(element.faculty.name)
    groups.add(element.group.name)
    days.add(new Date(element.lesson_date*1000).toLocaleDateString())
  });
})


app.get("/", (req, res) => {
  
  

  // console.log(groups);
  // console.log(facultys);
  // console.log(Date(1664150400));
  
  // console.log("bajarildi");
  // var txt=''
  // facultys.forEach(el=>{
  //   txt+=`<button>${el}</button>`
  // })
  // res.render('home',{
  //   data:txt
  // })
  // console.lo);
});

app.listen(3000, () => {
  console.log("port 3000");
});




// await axios.get("https://student.samdu.uz/rest/v1/data/schedule-list", {
//   headers:{
//     accept:"application/json",
//     Authorization:"Bearer dpbJRafHgNO28kk30iU_0XdAgOziHWTo"
//   },
//   params:{
//     year:2022,
//     page:1
//   }
// }).then(javob=>{
//   pageCount=javob.data.data.pagination.pageCount
//   console.log(pageCount);
// })
// for(let i=1;i<=pageCount;i++){
// await axios.get("https://student.samdu.uz/rest/v1/data/schedule-list", {
//   headers:{
//     accept:"application/json",
//     Authorization:"Bearer dpbJRafHgNO28kk30iU_0XdAgOziHWTo"
//   },
//   params:{
//     year:2022,
//     page:i
//   }
// }).then(javob=>{
//   // console.log(javob.data.data.items);
//   console.log(i);
//   javob.data.data.items.forEach(element => {
//     Items.push(element)
//   });
// })

// }

// fs.writeFile("data.json", JSON.stringify(Items), (err) => {
// if (err)
//   console.log(err);
// else {
//   console.log("File written successfully\n");
//   console.log("The written has the following contents:");
//   console.log(fs.readFileSync("data.json", "utf8"));
// }
// });
