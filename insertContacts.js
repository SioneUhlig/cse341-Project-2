require('dotenv').config();
const { MongoClient } = require('mongodb');

const sampleContacts = [
  {
    firstName: "Sione",
    lastName: "Uhlig",
    username: "Usione",
    favoriteColor: "blue",
    birthDay: "April 17, 1993", 
    
  },
  {
    firstName: "Jane",
    lastName: "Walz",
    email: "Jwalz",
    favoriteColor: "green",
    birthDay: "September 2, 2001",
    
  },
  {
    firstName: "Bob",
    lastName: "Miller",
    email: "Mbob",
    favoriteColor: "red",
    birthDay: "January 29, 1987",
  }
];

async function insertContacts() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db();
    
    const result = await db.collection('Project2').insertMany(sampleContacts);
    console.log(`${result.insertedCount} contacts inserted successfully!`);
    
    await client.close();
  } catch (err) {
    console.error('Error inserting contacts:', err);
  }
}

insertContacts();