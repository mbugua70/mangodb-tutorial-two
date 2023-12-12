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
    account_holder: "john hg doe",
    account_id: "jh350jfj54886",
    account_type: "checking",
    balance: 459909,
    last_updated: new Date(),
  },
  {
    account_holder: "john khkj doe child",
    account_id: "jg356ljl43463",
    account_type: "savings",
    balance: 4009909,
    last_updated: new Date(),
  },
  {
    account_holder: "john ljlk doe child",
    account_id: "jg356lj43463",
    account_type: "savings",
    balance: 9909,
    last_updated: new Date(),
  },
  {
    account_holder: "john hojk doe child",
    account_id: "jg35643463",
    account_type: "savings",
    balance: 9909,
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
