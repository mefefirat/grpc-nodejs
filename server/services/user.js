let { users } = require('../data');
const { v4: uuidv4 } = require('uuid');
const Service = {};

Service.getUsers = (_, callback) => {
    callback(null, { users: users });
}

Service.getUser = (_, callback) => {

    const userId = _.request.id;
    const user = users.find(({ id }) => userId == id);
    callback(null, user);
}

Service.addUser = (_, callback) => {

    let user = {..._.request, id:  uuidv4() };
    users.push(user)
    callback(null, user);
}

Service.getUserStream = (_, callback) => {

    for (var i = 0; i < users.length; i++) {
        callback(null, users[i]);
    }
};

module.exports = Service;