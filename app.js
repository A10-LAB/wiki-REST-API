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

// ******* DB 
// Соединение
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });
// DB Схема
const articleDBSchema = 
{
    title: String,
    content: String
};
// DB Модель
const Article = mongoose.model("Article", articleDBSchema);

// ******* Ядро - get/post
app.get("/article", function(req, res)
{
    // Пустые параметры поиска, потому что поиск всех объектов
    Article.find(function(ree, foundArticles)
    {
        console.log(foundArticles);
    });
});

// ******* Контроль запуска сервера
app.listen(3000, function() {
    console.log("Server started on port 3000");
});
