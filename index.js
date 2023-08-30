const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static("src/assets"));
app.use(express.urlencoded({ extended: false }));

// sequelize init
const config = require('./src/config/config.json');
const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = new Sequelize(config.development);


app.get("/add-project", (req, res) => {
  res.render("add-project");
});

app.post("/add-project", addBlog);

function addBlog(req, res) {
  // input title
  const title = req.body.title;

  // input durasi
  const dateStart = new Date(req.body.dateStart);
  const dateEnd = new Date(req.body.dateEnd);
  let subtraction = Math.abs(dateStart - dateEnd);
  let rounding = Math.ceil(subtraction / (1000 * 60 * 60 * 24));
  let duration;
  if (rounding >= 30 && rounding < 365) {
    duration = Math.floor(rounding / 30) + " bulan";
  } else if (rounding >= 365) {
    duration = Math.floor(rounding / 365) + " tahun";
  } else {
    duration = rounding + " hari";
  }

  // input content
  const content = req.body.content;

  // input technologies
  const nodejs = req.body.nodejs;
  const reactjs = req.body.reactjs;
  const js = req.body.js;
  const vuejs = req.body.vuejs;


  // object yang akan di push ke dataBlog[]
  const data = {
    title,
    duration,
    content,
    nodejs,
    reactjs,
    js,
    vuejs,
  };

  dataBlog.push(data);
  res.redirect("/");
}

app.get("/contact-me", (req, res) => {
  res.render("contact-me");
});

app.get("/blog-detail/:id", (req, res) => {
  const { id } = req.params;

  res.render("blog-detail", { data: dataBlog[id] });
});

app.get("/", async (req, res) => {
  try {
    const query = `SELECT id, title, content, duration, image, nodejs, reactjs, js, vuejs FROM "Projects";`
    let obj = await sequelize.query(query, {type: QueryTypes.SELECT})

    console.log(obj)
    res.render("index", { dataBlog: obj });
  } catch (error) {

  }
});


app.get("/edit-blog/:id", editBlog);
app.post("/update-blog/:id", updateBlog);

// edit to blog
function editBlog(req, res) {
  const id = parseInt(req.params.id);
  res.render("edit-blog",  { blog: dataBlog[id], blogIndex: id })
}

// update blog
function updateBlog(req, res) {
    const blogIndex = parseInt(req.body.blogIndex)
    const { title, duration, content, images, nodejs, reactjs, js, vuejs } = req.body

    dataBlog[blogIndex].title = title;
    dataBlog[blogIndex].content = content;
    dataBlog[blogIndex].duration = duration;
    dataBlog[blogIndex].nodejs = nodejs;
    dataBlog[blogIndex].reactjs = reactjs;
    dataBlog[blogIndex].js = js;
    dataBlog[blogIndex].vuejs = vuejs;
    res.redirect("/");
}


app.get("/delete-blog/:id", deleteBlog);
// delete card photo blog
function deleteBlog(req, res) {
  const { id } = req.params;

  dataBlog.splice(id, 1)
  res.redirect("/")
}

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
