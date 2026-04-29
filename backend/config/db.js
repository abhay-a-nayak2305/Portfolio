import { MongoClient } from 'mongodb';

let client = null;
let db = null;

const connectDB = async (env) => {
  const uri = env?.MONGODB_URI || process.env.MONGODB_URI;

  if (!uri || uri === 'REPLACE_WITH_YOUR_MONGODB_URI') {
    throw new Error('MONGODB_URI is not defined');
  }

  // Check if we have an existing connection that is still alive
  if (db && client) {
    try {
      // Simple ping to check if connection is still active
      await db.command({ ping: 1 });
      return db;
    } catch (e) {
      console.log('Existing MongoDB connection lost, reconnecting...');
      client = null;
      db = null;
    }
  }

  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(uri, {
      connectTimeoutMS: 3000,
      serverSelectionTimeoutMS: 3000,
      maxPoolSize: 1, // Minimize connections in serverless
    });
    
    await client.connect();
    
    // Extract database name from URI or default to 'portfolio'
    const urlParts = uri.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const dbName = lastPart.split('?')[0] || 'portfolio';
    
    db = client.db(dbName);
    console.log(`MongoDB Connected to database: ${dbName}`);
    return db;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    client = null;
    db = null;
    throw error;
  }
};

export default connectDB;
