const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const app = express();



//Using Sessions
app.use(session({secret:'todotopsecret'}))
.use((req,res,next) => {
    if(typeof(req.session.todolist) == 'undefined'){
        req.session.todolist = [];
    }
    next();
})
//Routes
.get('/',(req,res,next) => {
    res.send('Welcome to my Todo List');
    next();
})
/* The to do list and the form are displayed */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

app.listen(3000);