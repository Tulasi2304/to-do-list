const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({
    name: 'Welcome to your ToDo List'
});

const defaultItem = [item1];

Item.insertMany(defaultItem).then(() => {
    console.log("Successfully inserted default items");
}).catch((error) => {
    console.log(error);
});

app.get("/", (req, res) =>{
    res.render('list', {title: "Today", newItems: items});
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