const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

// Initialition handlebar
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//Initialition static folder
app.use(express.static("public"));
app.use(bodyParser.json());

var Items = [],
  ItemsId = new Set(),
  facultysId = new Set(),
  facultys = [],
  groupsId = new Set(),
  groups = [],
  semesterId = new Set(),
  courses = [],
  days = new Set();

fs.readFile("data.json", (err, data) => {
  Items = JSON.parse(data);

  Items.forEach((element) => {
    facultysId.add(element.faculty.id);
    groupsId.add(element.group.id);
    semesterId.add(element.semester.code);
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

//home
app.get("/", async (req, res) => {
  res.render("home");
});

// Fakultet tanlash
app.get("/faculty", (req, res) => {
  res.render("faculty", {
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
  res.render("group", {
    facultyId: { id: req.params.facultyId },
    courseCode: { code: req.params.courseCode },
    data: Groups,
  });
});

app.get(
  "/facultyId-:facultyId/course-:courseCode/groupId-:groupId",
  (req, res) => {
    var { facultyId, courseCode, groupId } = req.params;
    var today = new Date().toLocaleDateString();
    var someOneItem = Items.filter(
      (item) => new Date(item.lesson_date * 1000).toLocaleDateString() == today
    )[0];
    var weekStartTime = someOneItem?.weekStartTime;
    var weeklyData = Items.filter(
      (item) =>
        item.faculty.id == facultyId &&
        item.semester.code == courseCode &&
        item.group.id == groupId &&
        item.weekStartTime == weekStartTime
    );
    var mondayId = new Set(),
      tuesdayId = new Set(),
      wednesdayId = new Set(),
      thursdayId = new Set(),
      fridayId = new Set(),
      saturdayId = new Set();
    weeklyData.forEach((item) => {
      switch (item.lesson_date) {
        case weekStartTime:
          mondayId.add(item.id);
          break;
        case weekStartTime + 86400:
          tuesdayId.add(item.id);
          break;
        case weekStartTime + 86400 * 2:
          wednesdayId.add(item.id);
          break;
        case weekStartTime + 86400 * 3:
          thursdayId.add(item.id);
          break;
        case weekStartTime + 86400 * 4:
          fridayId.add(item.id);
          break;
        case weekStartTime + 86400 * 5:
          saturdayId.add(item.id);
          break;

        default:
          break;
      }
    });
    var monday = [],
        tuesday=[],
        wednesday=[],
        thursday=[],
        friday=[],
        saturday=[]
    mondayId.forEach(id=>{
      monday.push(weeklyData.find(item=>item.id==id))
    })
    tuesdayId.forEach(id=>{
      tuesday.push(weeklyData.find(item=>item.id==id))
    })
    wednesdayId.forEach(id=>{
      wednesday.push(weeklyData.find(item=>item.id==id))
    })
    thursdayId.forEach(id=>{
      thursday.push(weeklyData.find(item=>item.id==id))
    })
    fridayId.forEach(id=>{
      friday.push(weeklyData.find(item=>item.id==id))
    })
    saturdayId.forEach(id=>{
      saturday.push(weeklyData.find(item=>item.id==id))
    })

    res.render("jadval", {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    });
  }
);

app.listen(3000, () => {
  console.log("port 3000");
});

// var pageCount = 2;
// await axios.get("https://student.samdu.uz/rest/v1/data/schedule-list", {
//     headers: {
//       accept: "application/json",
//       Authorization: "Bearer dpbJRafHgNO28kk30iU_0XdAgOziHWTo",
//     },
//     params: {
//       year: 2022,
//       page: 1,
//     },
//   })
//   .then((javob) => {
//     pageCount = javob.data.data.pagination.pageCount;
//     console.log(javob.data.data.items.length);
//   });
// for (let i = 1; i <= pageCount; i++) {
//   await axios
//     .get("https://student.samdu.uz/rest/v1/data/schedule-list", {
//       headers: {
//         accept: "application/json",
//         Authorization: "Bearer dpbJRafHgNO28kk30iU_0XdAgOziHWTo",
//       },
//       params: {
//         year: 2022,
//         page: i,
//       },
//     })
//     .then((javob) => {
//       // console.log(javob.data.data.items);
//       console.log(i);
//       javob.data.data.items.forEach((element) => {
//         Items.push(element);
//         // if (Items.length == 0) {
//         //   ItemsId.add(element.id);
//         //   Items.push(element);
//         // } else {
//         //   ItemsId.forEach((id) => {
//         //     if (id != element.id) {
//         //       ItemsId.add(element.id);
//         //     }
//         //   });
//         // }
//       });
//     });
// }
// // console.log('id', ItemsId);
// console.log('items', Items.length);

// await fs.writeFile("data.json", JSON.stringify(Items), (err) => {
//   if (err) console.log(err);
//   else {
//     console.log("File written successfully\n");
//     // console.log(fs.readFileSync("data.json", "utf8"));
//   }
// });
