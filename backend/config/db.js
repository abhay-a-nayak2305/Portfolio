import { MongoClient } from 'mongodb';

let client = null;
let db = null;

const connectDB = async (env) => {
  if (db) return db;

  const uri = env?.MONGODB_URI || process.env.MONGODB_URI;

  if (!uri || uri === 'REPLACE_WITH_YOUR_MONGODB_URI') {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    if (!client) {
      client = new MongoClient(uri, {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
      });
      await client.connect();
    }
    
    // Extract database name from URI or default to 'portfolio'
    const dbName = uri.split('/').pop().split('?')[0] || 'portfolio';
    db = client.db(dbName);
    
    console.log('MongoDB Connected via Native Driver');
    return db;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
