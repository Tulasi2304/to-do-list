const express = require('express');
const ejs = require('ejs');
const day = require('./date.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const items = [];
const workItems = [];

app.get("/", (req, res) =>{
    const getDay = day();
    res.render('list', {title: getDay, newItems: items});
});

app.post("/", (req, res) => {
    const item = req.body.todo;
    if(req.body.list === 'Work'){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work", (req, res) => {
    res.render("list", {title: "Work", newItems: workItems});
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})