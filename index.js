const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static("src/assets"));
app.use(express.urlencoded({ extended: false }));

// sequelize init
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

app.get("/add-project", (req, res) => {
  res.render("add-project");
});

app.post("/add-project", addBlog);

async function addBlog(req, res) {
  try {
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
    const image = "/image/project.jpg";

    // input technologies
    const nodejs = req.body.nodejs;
    const reactjs = req.body.reactjs;
    const js = req.body.js;
    const vuejs = req.body.vuejs;

    const nodejsCheck = nodejs === "true" ? true : false;
    const reactjsCheck = reactjs === "true" ? true : false;
    const javascriptCheck = js === "true" ? true : false;
    const vuejsCheck = vuejs === "true" ? true : false;

    await sequelize.query(`INSERT INTO "Projects"(
      title, content, duration, image, nodejs, reactjs, js, vuejs, "createdAt", "updatedAt")
      VALUES ('${title}', '${content}', '${duration}', '${image}', '${nodejsCheck}', '${reactjsCheck}', '${javascriptCheck}', '${vuejsCheck}', NOW(), NOW());`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

app.get("/contact-me", (req, res) => {
  res.render("contact-me");
});

app.get("/blog-detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM "Projects" WHERE id=${id}`;

    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    res.render("blog-detail", { data: obj[0] });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req, res) => {
  try {
    const query = `SELECT id, title, content, duration, image, nodejs, reactjs, js, vuejs FROM "Projects";`;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    res.render("index", { dataBlog: obj });
  } catch (error) {}
});

app.get("/edit-blog/:id", editBlog);
app.post("/update-blog/:id", updateBlog);

// edit to blog
async function editBlog(req, res) {
  const { id } = req.params;

  try {
    // const query= `SELECT * FROM "dataProjectNews" WHERE id= ${id};`
    const query = `SELECT * FROM "Projects" WHERE id= ${id};`;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    console.log(obj);

    res.render("edit-blog", { blog: obj[0] });
  } catch (error) {
    console.log(error);
  }
}

// function editBlog(req, res) {
//   const id = parseInt(req.params.id);
//   res.render("edit-blog", { blog: dataBlog[id], blogIndex: id });
// }

// update blog
async function updateBlog(req, res) {
  try {
    const { title, content, nodejs, reactjs, js, vuejs} = req.body;

    const { id } = req.params;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    let subtraction = Math.abs(startDate - endDate);
    let rounding = Math.ceil(subtraction / (1000 * 60 * 60 * 24));
    let duration;
    if (rounding >= 30 && rounding < 365) {
      duration = Math.floor(rounding / 30) + " bulan";
    } else if (rounding >= 365) {
      duration = Math.floor(rounding / 365) + " tahun";
    } else {
      duration = rounding + " hari";
    }

      await sequelize.query(`UPDATE "Projects" 
      SET 
          title = '${title}', 
          image = '/image/project.jpg', 
          content = '${content}', 
          "nodejs" = ${req.body.nodejs ? true : false},
          "reactjs" = ${req.body.reactjs ? true : false},
          "js" = ${req.body.js ? true : false},
          "vuejs" = ${req.body.vuejs ? true : false},
          duration = '${duration}'
      WHERE 
          id = ${id}
      ;`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}
// function updateBlog(req, res) {
//   const blogIndex = parseInt(req.body.blogIndex);
//   const { title, duration, content, images, nodejs, reactjs, js, vuejs } =
//     req.body;
//   res.redirect("/");
// }

app.get("/delete-blog/:id", deleteBlog);
// delete card photo blog
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;

    await sequelize.query(`DELETE FROM "Projects" WHERE id = ${id}`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
