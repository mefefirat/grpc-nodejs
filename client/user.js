const client = require("./index");

/*client.GetUser({name: "Mustafa", id: 1}, function(err, response) {
    console.log('User:', response);
});*/

client.AddUser({id: 3, first_name: "Ahmet", last_name: "Yaman", email: true}, function(err, response) {
    console.log(response);
});

/*client.GetUsers({}, function(err, response) {
    console.log(response);
});*/

