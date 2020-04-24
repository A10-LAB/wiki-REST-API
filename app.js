// **********************************************************************************
// Локально тестируется с использованием postman
// **********************************************************************************

// ******* Определение переменных
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// ******* Технический код модулей
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// ******* Mongo DB 
// Соединение
mongoose.connect("mongodb://localhost:27017/wikiDb", { useNewUrlParser: true, useUnifiedTopology: true });
// DB Схема
const articleSchema = 
{
    title: String,
    content: String
};
// DB Модель
const Article = mongoose.model("Article", articleSchema);

// ******* Ядро - get/post
// GET через все коллекции
app.get("/articles", function(req, res)
{
    // Пустые параметры поиска, потому что поиск всех объектов
    Article.find(function(err, foundArticles)
    {
        if(!err)
        {res.send(foundArticles);}
        else
        {res.send(err);}
    });
});

// POST через все коллекции исходя из требований конвенции о наименованиях
// Вместо name, которые были бы в форме - в каждом инпуте и по которым была бы связь с методом post используется парсер по соответстующему свойству
app.post("/articles", function(req, res)
{
    // Создание нового документа-схемы в БД
    const newArticle = new Article
    ({
        title: req.body.title,
        content: req.body.content 
    });
    newArticle.save(function(err)
    {
        if(!err){res.send("/// app.post to create newArticle completed ///")} 
        else {res.send(err);
    }
});
});

// Запрос на DELETE
app.delete("/articles", function (req, res)
{
Article.deleteMany(function(err)
{
    if (!err)
    {
        res.send("/// app.delete to delete all Article completed ///");
    }
    else 
    {
        res.send(err);
    }
});
});

// ******* Контроль запуска сервера
app.listen(3000, function() {
    console.log("Server started on port 3000");
});
