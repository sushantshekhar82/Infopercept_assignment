import config from '../config/contant';
import mongoose from 'mongoose';
const connections: Record<string, mongoose.Connection> = {};
const getDynamicConnection = (dbName: string) => {

  if (connections[dbName]) {
    return connections[dbName];
  }
console.log("connections",connections,config.app.MONGO_USERNAME,config.app.MONGO_PASSWORD,config.app.MONGO_CLUSTER,dbName)
  const uri = `mongodb+srv://${config.app.MONGO_USERNAME}:${config.app.MONGO_PASSWORD}@${config.app.MONGO_CLUSTER}/${dbName}?retryWrites=true&w=majority`;
console.log("uri",uri)
  const connection = mongoose.createConnection(uri);

  connections[dbName] = connection;

  console.log("++++++++++-",connection)
  return connection;
};

export default getDynamicConnection;