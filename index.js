const express = require ('express');
const app = express();
const PORT = 5000;
const path = require ('path');
const { start } = require('repl');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('src/assets'));
app.use(express.urlencoded({ extended: false }));

app.get('/add-project', (req, res) => {
    res.render('my-project')
});
app.post('/add-project', addBlog)
function addBlog(req, res) {
    const title = req.body.title
    const dateStart = req.body.dateStart
    const dateEnd = req.body.dateEnd
    const content = req.body.content
    const checkStack = req.body.checkStack

    console.log(title);
    console.log(dateStart);
    console.log(dateEnd);
    console.log(checkStack);
    console.log(content);

    res.redirect('/')
}

app.get('/contact-me', (req, res) => {
    res.render('contact-me')
});

app.get('/blog-detail/:id', (req, res) => {
    const { id } = req.params
    const data = {
        id,
        title : 'Web developer',
        content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae amet sunt assumenda laudantium cumque recusandae doloremque ut sint nesciunt officia architecto nemo molestias quasi ad totam expedita veniam saepe, molestiae voluptas repellat accusantium, accusamus libero perspiciatis explicabo.',
    }
    res.render('blog-detail', data)
});

app.get('/', (req, res) => {
    res.render('index')
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});