const PROTO_PATH = "./protos/user.proto";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Service = require('./services/user');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const Proto = grpc.loadPackageDefinition(packageDefinition).UserService;

function getServer() {
    const server = new grpc.Server();
    server.addService(Proto.UserService.service, {
        GetUsers: Service.getUsers,
        GetUser: Service.getUser,
        AddUser: Service.addUser,
        GetUserStream: Service.getUserStream

    });
    return server;
}

const routeServer = getServer();
routeServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    routeServer.start();
});