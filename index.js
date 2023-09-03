// === import modul === //
const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const moment = require("moment");
const flash = require("express-flash");
const upload = require("./src/middlewares/uploadFiles");

// === konfigurasi express js === //
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static("src/assets"));
app.use(express.static("src/uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "secret value",
  })
);
app.use(flash());

// === sequelize init === //
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

// === add project === //
app.get("/add-project", (req, res) => {
  res.render("add-project");
});

app.post("/add-project", upload.single("inputImage"), addProject);
async function addProject(req, res) {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const image = req.file.filename;
    const nodejs = req.body.nodejs;
    const reactjs = req.body.reactjs;
    const js = req.body.js;
    const vuejs = req.body.vuejs;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const author = req.session.idUser;

    // count duration //
    const dateStart = new Date(req.body.startDate);
    const dateEnd = new Date(req.body.endDate);
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

    // technologies condition //
    const nodejsCheck = nodejs === "true" ? true : false;
    const reactjsCheck = reactjs === "true" ? true : false;
    const javascriptCheck = js === "true" ? true : false;
    const vuejsCheck = vuejs === "true" ? true : false;

    await sequelize.query(`INSERT INTO "Projects"(
      title, author, content, image, "startDate", "endDate", duration, nodejs, reactjs, js, vuejs, "createdAt", "updatedAt")
      VALUES ('${title}', ${author}, '${content}', '${image}', '${startDate}', '${endDate}', '${duration}', '${nodejsCheck}', '${reactjsCheck}', '${javascriptCheck}', '${vuejsCheck}', NOW(), NOW());`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

// === contact me === //
app.get("/contact-me", (req, res) => {
  res.render("contact-me");
});

// === project detail === //
app.get("/project-detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT "Projects".id, title, "Users".name AS author, content, image, "startDate", "endDate", duration, nodejs, reactjs, js, vuejs
    FROM "Projects" LEFT JOIN "Users" ON "Projects".author = "Users".id WHERE "Projects".id=${id}`;

    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log(obj);
    res.render("project-detail", { data: obj[0] });
  } catch (error) {
    console.log(error);
  }
});

// === home/index === //
app.get("/", async (req, res) => {
  try {
    let author = req.session.idUser
    if (!author) {
      
      const query = `SELECT "Projects".id, title, "Users".name AS author, content, image, "startDate", "endDate", duration, nodejs, reactjs, js, vuejs
      FROM "Projects" INNER JOIN "Users" ON "Projects".author = "Users".id;`;

    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    const objUpdate = obj.map((item) => {
      return {
        ...item,
        startDate: moment(item.startDate).format("DD-MMM-YYYY"),
        endDate: moment(item.endDate).format("DD-MMM-YYYY"),
        loged: req.session.isLogin,
        idUser: req.session.idUser,
      };
    });
    const loginCheck = {
      isLogin: req.session.isLogin,
      user: req.session.user,
      idUser: req.session.idUser
    };
    res.render("index", { dataBlog: objUpdate, loginCheck });
  } else {
    author=author;
    const query = `SELECT "Projects".id, title, "Users".name AS author, content, image, "startDate", "endDate", duration, nodejs, reactjs, js, vuejs
    FROM "Projects" INNER JOIN "Users" ON "Projects".author = "Users".id WHERE author = ${author};`;

  let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  const objUpdate = obj.map((item) => {
    return {
      ...item,
      startDate: moment(item.startDate).format("DD-MMM-YYYY"),
      endDate: moment(item.endDate).format("DD-MMM-YYYY"),
      loged: req.session.isLogin,
      idUser: req.session.idUser,
    };
  });
  const loginCheck = {
    isLogin: req.session.isLogin,
    user: req.session.user,
    idUser: req.session.idUser
  };
  res.render("index", { dataBlog: objUpdate, loginCheck });

  }
  } catch (error) {}
});

// === edit project === //
app.get("/edit-project/:id", editProject);
async function editProject(req, res) {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM "Projects" WHERE id= ${id};`;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    obj = obj.map((item) => {
      return {
        ...item,
        startDate: moment(item.startDate).format("YYYY-MM-DD"),
        endDate: moment(item.endDate).format("YYYY-MM-DD"),
      };
    });

    res.render("edit-project", { blog: obj[0] });
  } catch (error) {
    console.log(error);
  }
}

app.post("/update-project/:id", upload.single("inputImage"), updateProject);
async function updateProject(req, res) {
  try {
    const { title, content, startDate, endDate } = req.body;
    const image = req.file.filename;

    const { id } = req.params;

    const dateStart = new Date(req.body.startDate);
    const dateEnd = new Date(req.body.endDate);
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

    await sequelize.query(`UPDATE "Projects"
    SET 
      title='${title}', 
      content='${content}', 
      image='${image}', 
      "startDate"= '${startDate}',
      "endDate"= '${endDate}',
      duration='${duration}', 
      "nodejs"=${req.body.nodejs ? true : false}, 
      "reactjs"=${req.body.reactjs ? true : false}, 
      "js"=${req.body.js ? true : false}, 
      "vuejs"=${req.body.vuejs ? true : false} 
      WHERE id = ${id};`);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

// === delete project card === //
app.get("/delete-project/:id", deleteProject);
async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    await sequelize.query(`DELETE FROM "Projects" WHERE id = ${id}`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

// === form register === //
app.get("/register", formRegister);
function formRegister(req, res) {
  res.render("register");
}
app.post("/register", addUser);
async function addUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const salt = 10;

    await bcrypt.hash(password, salt, (err, hashPassword) => {
      const query = `INSERT INTO "Users" (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`;
      sequelize.query(query);
      res.redirect("login");
    });
  } catch (error) {
    console.log(error);
  }
}

// === form login === //
app.get("/login", formLogin);
function formLogin(req, res) {
  res.render("login");
}

app.post("/login", userLogin);
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const query = `SELECT * FROM "Users" WHERE email = '${email}'`;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    if (!obj.length) {
      req.flash("danger", "user has not been registered");
      return res.redirect("/login");
    }
    await bcrypt.compare(password, obj[0].password, (err, result) => {
      if (!result) {
        req.flash("danger", "password wrong");
        return res.redirect("/login");
      } else {
        req.session.isLogin = true;
        req.session.idUser = obj[0].id;
        req.session.user = obj[0].name;
        req.flash("success", "login success");
        res.redirect("/");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// === logout === //
app.get("/logout", logout);
function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

// === PORT url === //
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
