import dns from 'node:dns';
import { MongoClient } from 'mongodb';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
}

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bazardor';

declare global {
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri);
}

export { client };
export default client;
