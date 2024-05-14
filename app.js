const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const _ = require('lodash');

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

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = mongoose.model('List', listSchema);

const defaultItem = [item1];

app.get("/", (req, res) =>{

    Item.find({}).then((result) => {

        if(result.length === 0){
            Item.insertMany(defaultItem).then(() => {
                console.log("Successfully inserted default items");
            }).catch((error) => {
                console.log(error);
            });
            res.redirect('/');
        }
        else{
            res.render('list', {title: "Today", newItems: result});
        }

    }).catch((error) =>{
        console.log(error);
    });
});

app.post("/", (req, res) => {
    const newItem = req.body.todo;
    const listName = req.body.list;
    const item = new Item({
        name: newItem
    });
    if(listName === 'Today'){
        item.save();
        res.redirect('/');
    }
    else{
        List.findOne({name: listName}).then((result) => {
            result.items.push(item);
            result.save();
            res.redirect('/lists/'+listName);
        })
        .catch((error) => {
            console.log(error);
        });
    }

});

app.get("/lists/:customList", (req, res) => {
    const customListName = _.capitalize(req.params.customList);
    List.findOne({name: customListName}).then((result) => {
        if(!result){
            const list = new List({
                name: customListName,
                items: defaultItem
            });
            list.save();
            res.redirect('/lists/'+customListName);
        }
        else{
            res.render("list", {title: result.name, newItems: result.items});
        }
    })

});

app.post('/delete', (req, res) => {
    const checkedItem = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndDelete(checkedItem).then(() => {
            console.log("Deleted checked item successfully");
        })
        .catch((error) => {
            console.log(error);
        });
    
        res.redirect('/');
    }
    else{
        List.findOneAndUpdate(
            {name: listName},
            {$pull: {items: {_id: checkedItem}}}
        ).then(() => {
            res.redirect('/lists/'+listName);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})