const PROTO_PATH = "./protos/user.proto";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { v4: uuidv4 } = require('uuid');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const Proto = grpc.loadPackageDefinition(packageDefinition).UserService;

let users = [
    {
        id: 'c6dbc02a-a06a-11ed-a8fc-0242ac120002',
        first_name: 'Mustafa',
        last_name: 'FIRAT',
        email: "mefe@mefe.net",
    },
    {
        id: 'd4c841ea-a06a-11ed-a8fc-0242ac120002',
        first_name: 'Ahmet',
        last_name: 'Yaman',
        email: "ayaman@gmail.com",
    },
];

function getUsers(_, callback) {
    callback(null, { users: users });
}

function getUser(_, callback) {

    const userId = _.request.id;
    const user = users.find(({ id }) => userId == id);
    callback(null, user);
}

function addUser(_, callback) {

    let user = {..._.request, id:  uuidv4() };
    users.push(user)
    callback(null, user);
}

function getServer() {
    const server = new grpc.Server();
    server.addService(Proto.UserService.service, {
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