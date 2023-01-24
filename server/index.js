const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./protos/user.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
const users = [
    { id: "1", first_name: "Note 1", last_name: "Content 1", email: "Post image 1" },
    { id: "2", first_name: "Note 2", last_name: "Content 2", email: "Post image 2" },
];

server.addService(userProto.UserService.service, {
    GetAllUsers: (_, callback) => {
        callback(null, users);
    },
    getUsers: (_, callback) => {
        const userId = _.request.id;
        const userItem = users.find(({ id }) => userId == id);
        callback(null, userItem);
    },
    deleteUser: (_, callback) => {
        const userId = _.request.id;
        //_users = users.filter(({ id }) => id !== userId);
        callback(null, {});
    },
    editUser: (_, callback) => {
        const userId = _.request.id;
        const userItem = users.find(({ id }) => userId == id);
        userItem.first_name = _.request.first_name;
        userItem.last_name = _.request.last_name;
        userItem.email = _.request.email;
        callback(null, userItem);
    },
    addUser: (call, callback) => {
        let _users = { id: Date.now(), ...call.request };
        user.push(_users);
        callback(null, _users);
    },
});

server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server at port:", port);
        console.log("Server running at http://127.0.0.1:50051");
        server.start();
    }
);