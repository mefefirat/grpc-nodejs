const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./protos/user.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const Service = grpc.loadPackageDefinition(packageDefinition).UserService;

const client = new Service.UserService("10.16.0.2:50051", grpc.credentials.createInsecure());

module.exports = client;