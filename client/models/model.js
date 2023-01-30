const grpcClient = require('../config/client');

const Model = {};

Model.getUsers = () => {
    return new Promise((resolve, reject) => {
        grpcClient.GetUsers({}, function(error, response) {
            if(error) return reject(error);
            return resolve(response);
        });
    });
};

Model.getUser = (id) => {
    return new Promise((resolve, reject) => {
        grpcClient.GetUser({id: id}, function(error, response) {
            if(error) return reject(error);
            return resolve(response);
        });
    });
};

Model.addUser = (data) => {
    return new Promise((resolve, reject) => {
        grpcClient.AddUser(data, function(error, response) {
            if(error) return reject(error);
            return resolve( {status: "success", user: response});
        });
    });
};

module.exports = Model;