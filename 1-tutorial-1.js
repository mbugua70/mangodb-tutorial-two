const { MongoClient } = require("mongodb");

// our database connction string
const uri = require("./atlas_uri");

console.log(uri);

// mangodb uri instance
const client = new MongoClient(uri);

const dbname = "bank";
const collection_name = "accounts";

const accountsCollection = client.db(dbname).collection(collection_name);

// db connection

const connectToDatabase = async () => {
  try {
    // initializing the connection to the database
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
  } catch (err) {
    console.error(`Error connecting to the ${dbname} database: ${err}`);
  }
};

// document

const simpleAccount = {
  account_holder: "john doe",
  account_id: "jh35054886",
  account_type: "checking",
  balance: 459909,
  last_updated: new Date(),
};

const main = async () => {
  try {
    await connectToDatabase();
    // the use of insertOne() method
    const result = await accountsCollection.insertOne(simpleAccount);
    console.log(`Inserted document:${result.insertedId}`);
    // const databaselist = await client.db().admin().listDatabases();
    // databaselist.databases.forEach(db => console.log(db.name))
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  } finally {
    await client.close();
  }
};

// run the main function
main();
