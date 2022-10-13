const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const axios = require("axios");
const fs = require("fs");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

var Items = [],
  facultysId = new Set(),
  facultys = [],
  groupsId = new Set(),
  groups = [],
  semesterId = new Set(),
  courses = [],
  days = new Set();
// weekStart = new Set(),
// weekEnd = new Set();

fs.readFile("data.json", (err, data) => {
  Items = JSON.parse(data);
  // console.log(Items);

  Items.forEach((element) => {
    facultysId.add(element.faculty.id);
    groupsId.add(element.group.id);
    semesterId.add(element.semester.code);
    // days.add(new Date(element.lesson_date * 1000).toLocaleDateString());
    // weekStart.add(new Date(element.weekStartTime * 1000).toLocaleDateString());
    // weekEnd.add(new Date(element.weekEndTime * 1000).toLocaleDateString());
  });

  facultysId.forEach((item) => {
    facultys.push(Items.filter((el) => el.faculty.id == item)[0]);
  });

  groupsId.forEach((item) => {
    groups.push(Items.filter((el) => el.group.id == item)[0]);
  });

  semesterId.forEach((item) => {
    switch (item) {
      case "11":
        courses.push({ code: 11, name: "1-kurs" });
        break;

      case "13":
        courses.push({ code: 13, name: "2-kurs" });
        break;

      case "15":
        courses.push({ code: 15, name: "3-kurs" });
        break;

      default:
        break;
    }
  });
});

// Fakultet tanlash
app.get("/", (req, res) => {
  res.render("home", {
    data: facultys,
  });
});

// kurs tanlash
app.get("/facultyId-:facultyId", (req, res) => {
  res.render("semester", {
    facultyId: { id: req.params.facultyId },
    data: courses,
  });
});

//guruh tanlash
app.get("/facultyId-:facultyId/course-:courseCode", (req, res) => {
  var Groups = groups.filter(
    (el) =>
      el.faculty.id == req.params.facultyId &&
      el.semester.code == req.params.courseCode
  );
  res.render("groups", {
    facultyId: { id: req.params.facultyId },
    courseCode: { code: req.params.courseCode },
    data: Groups,
  });
});

app.get(
  "/facultyId-:facultyId/course-:courseCode/groupId-:groupId",
  (req, res) => {
    var { facultyId, courseCode, groupId } = req.params;
    var today = new Date().toLocaleDateString()
    var someOneItem = Items.filter(
      (item) =>
        new Date(item.lesson_date * 1000).toLocaleDateString() == today
    )[0];
    var weekStartTime = someOneItem?.weekStartTime;
    var weeklyData = Items.filter(
      (item) =>
        item.faculty.id == facultyId &&
        item.semester.code == courseCode &&
        item.group.id == groupId &&
        item.weekStartTime == weekStartTime
    );
    var monday = weeklyData.filter(item=>item.lesson_date==weekStartTime),
        tuesday = weeklyData.filter(item=>item.lesson_date==weekStartTime+86400000),
        wednesday = weeklyData.filter(item=>item.lesson_date==weekStartTime+2*86400000),
        thursday = weeklyData.filter(item=>item.lesson_date==weekStartTime+3*86400000),
        friday = weeklyData.filter(item=>item.lesson_date==weekStartTime+4*86400000),
        saturday = weeklyData.filter(item=>item.lesson_date==weekStartTime+5*86400000);
    days.clear();
    console.log();
    weeklyData.forEach((item) => days.add(item.lesson_date));

    console.log(new Date(1665360000*1000+86400000));
    res.render("jadval", {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday
    })
  }
);

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
