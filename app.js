const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let items = [];
app.get("/", (req, res) =>{
    let today = new Date();
    // console.log(today);
    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    
    let getDay = today.toLocaleDateString('en-IN', options);
    
    res.render('list', {day: getDay, newItems: items});
});

app.post("/", (req, res) => {
    let item = req.body.todo;
    items.push(item);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})