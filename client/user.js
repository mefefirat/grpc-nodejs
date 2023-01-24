const client = require("./index");

client.GetAllUsers({}, (error, users) => {
    if (!error) throw error;
    console.log(users);
});