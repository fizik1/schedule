const express = require("express");
const app = express();
const axios = require("axios");


var groups= new Set()
groups.add('salom')
console.log(groups);

app.get("/", async (req, res) => {
  let newItems = [];
  var pageCount=0


  await axios.get("https://student.samdu.uz/rest/v1/data/schedule-list", {
      headers:{
        accept:"application/json",
        Authorization:"Bearer dpbJRafHgNO28kk30iU_0XdAgOziHWTo"
      }
    }).then(javob=>{
      pageCount=javob.data.data.pagination.pageCount
      console.log(javob.data.data.items[0]);
    })
  for(let i=0;i<=10;i++){
    await axios.get("https://student.samdu.uz/rest/v1/data/schedule-list", {
      headers:{
        accept:"application/json",
        Authorization:"Bearer dpbJRafHgNO28kk30iU_0XdAgOziHWTo"
      },
      params:{
        year:2022,
        page:i
      }
    }).then(javob=>{
      // console.log(javob.data.data.items);
      console.log(i);
      javob.data.data.items.forEach(element => {
        newItems.push(element)
      });
    })
    
  }
  var faculties = []
  newItems.forEach(item=>{
    // console.log(faculties[item.faculty.id]);
    if(faculties[0]){
      console.log("b");
      faculties.map((item1, index)=>{
        console.log(item1.id);
        // if(item.faculty.id!=item1.id){
        //   console.log("c");
        //   faculties.push({id:item.faculty.id, name:item.faculty.name})
        // }
      })
    }else{
      console.log("a");
      faculties.push({id:item.faculty.id, name:item.faculty.name})
    }
  })

  console.log(faculties);


});

app.listen(3000, () => {
  console.log("port 3000");
});
