const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let items = [];
let workItems = [];

app.get("/", (req, res) =>{
    let today = new Date();
    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    
    let getDay = today.toLocaleDateString('en-IN', options);
    
    res.render('list', {title: getDay, newItems: items});
});

app.post("/", (req, res) => {
    let item = req.body.todo;

    if(req.body.list === 'Work'){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work", (req, res) => {
    let title = "Work";
    res.render("list", {title: title, newItems: workItems});
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})