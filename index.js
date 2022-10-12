const express = require("express");
const app = express();
const { engine } = require("express-handlebars")
const axios = require("axios");
const fs = require('fs')


app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


var Items = [],
    facultysId = new Set(),
    facultys = [],
    groupsId = new Set(),
    groups = [],
    semester = new Set(),
    days = new Set(),
    weekStart = new Set(),
    weekEnd = new Set()


fs.readFile("data.json", (err, data)=>{
  Items = JSON.parse(data)
  // console.log(Items);

  Items.forEach(element => {
    facultysId.add(element.faculty.id)
    groupsId.add(element.group.id)
    semester.add(element.semester.code)
    days.add(new Date(element.lesson_date*1000).toLocaleDateString())
    weekStart.add(new Date(element.weekStartTime*1000).toLocaleDateString())
    weekEnd.add(new Date(element.weekEndTime*1000).toLocaleDateString())
  });
  
  facultysId.forEach(item=>{
    facultys.push(Items.filter(el=>el.faculty.id==item)[0])
  })

  groupsId.forEach(item=>{
    groups.push(Items.filter(el=>el.group.id==item)[0])
  })

  
})


app.get("/", (req, res) => {
  res.render('home',{
    data:facultys
  })
});

app.get("/facultyId-:facultyId", (req, res)=>{
  console.log(req.params.facultyId);
  
  var Groups = groups.filter(el=>el.faculty.id==req.params.facultyId)
  console.log(Groups);
  res.render("groups", {
    facultyId:{id:req.params.facultyId},
    data:Groups,
  })
})

app.get("/facultyId-:facultyId/groupId-:groupId", (req, res)=>{
  res.render("semester", {
    data:semester
  })
})

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
