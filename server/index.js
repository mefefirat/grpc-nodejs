const PROTO_PATH = "./protos/user.proto";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const UserProto = grpc.loadPackageDefinition(packageDefinition).UserService;

let users = [
    {
        id: 1,
        first_name: 'test',
        last_name: 'sdfsdfsdf',
        email: true
    },
    {
        id: 1,
        first_name: 'test',
        last_name: 'sdfsdfsdf',
        email: false
    },
];

function getUsers(_, callback) {
    callback(null, { users: users });
}

function getUser(_, callback) {

    let user = {
        id: 1,
        first_name: 'test'
    };
    callback(null, user);
}

function addUser(_, callback) {

    users.push({
        id: _.request.id,
        first_name: _.request.first_name,
        last_name: _.request.last_name,
        email: _.request.email
    });
    callback(null, users);
}

function getServer() {
    const server = new grpc.Server();
    server.addService(UserProto.UserService.service, {
        GetUsers: getUsers,
        GetUser: getUser,
        AddUser: addUser

    });
    return server;
}

const routeServer = getServer();
routeServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    routeServer.start();
});