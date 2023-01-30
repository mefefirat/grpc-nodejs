const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const model = require("./models/model");





app.get('/users', async (req, res) => {

    try {
        let users = await model.getUsers();
        res.status(200).send(users);
        console.log(users);

    } catch (error)
    {
        res.status(500).send(error);
    }
});

app.get('/user/:id', async (req, res) => {

    try {
        let user = await model.getUser(req.params.id);
        res.status(200).send(user);
    } catch (error)
    {
        res.status(500).send(error);
    }
});

app.post('/user', async (req, res) => {

    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    }

    try {
        let user = await model.addUser(data);
        res.status(200).send(user);
    } catch (error)
    {
        console.log("hata");
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

/*client.GetUser({name: "Mustafa", id: 1}, function(err, response) {
    console.log('User:', response);
});*/

/*client.AddUser({id: 3, first_name: "Ahmet", last_name: "Yaman", email: true}, function(err, response) {
    console.log(response);
});*/

/*client.GetUsers({}, function(err, response) {
    console.log(response);
});*/