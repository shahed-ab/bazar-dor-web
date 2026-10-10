import dns from 'node:dns';
import { MongoClient } from 'mongodb';

// Custom DNS fallback is only required on Windows in local development for SRV lookup
if (process.env.NODE_ENV === 'development') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {
  }
}

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bazardor';

if (!process.env.MONGODB_URI) {
  console.warn('[MongoDB] MONGODB_URI environment variable is missing in this environment.');
}

declare global {
  var _mongoClient: MongoClient | undefined;
}

const mongoOptions = {
  autoSelectFamily: false,
};

if (!global._mongoClient) {
  global._mongoClient = new MongoClient(uri, mongoOptions);
}
const client: MongoClient = global._mongoClient;

export { client };
export default client;
