const config = require('./config');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(config.grpc.PROTO_PATH, options);

const Service = grpc.loadPackageDefinition(packageDefinition).UserService;

const client = new Service.UserService(`${config.grpc.host}:${config.grpc.port}`, grpc.credentials.createInsecure());

module.exports = client;