const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);

const dbName = "bank";
const collection_name = "accounts";

const accountsCollection = client.db(dbName).collection(collection_name);

// database connection

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbName} database`);
  } catch (err) {
    console.error(`Error connecting to the ${dbName} database: ${err}`);
  }
};

const simpleAccount = [
  {
    account_holder: "john doe",
    account_id: "jh35054886",
    account_type: "checking",
    balance: 459909,
    last_updated: new Date(),
  },
  {
    account_holder: "john doe child",
    account_id: "jg35643463",
    account_type: "savings",
    balance: 4009909,
    last_updated: new Date(),
  },
];

const main = async () => {
  try {
    await connectToDatabase();
    // inserted the docs into the database using the insertMany()
    const result = accountsCollection.insertMany(simpleAccount);
    console.log(`Inserted ${(await result).insertedCount} documents`);
    console.log(result);
  } catch (err) {
    console.error(`Failed to insert the doc: ${err}`);
  } finally {
    // closing the connection
    await client.close();
  }
};

main();
