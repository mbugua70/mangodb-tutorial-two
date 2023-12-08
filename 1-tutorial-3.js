const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);

const dbName = "bank";
const collection_name = "accounts";

const accountsCollection = client.db(dbName).collection(collection_name);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbName} database`);
  } catch (err) {
    console.error(`Failed to connect to the ${dbName} database`);
  }
};

let documentToFind = { balance: { $lt: 500000 } };
// one can also use $gt for greater than as a query filter

const main = async () => {
  try {
    await connectToDatabase();
    //  the use of find() method
    let result = accountsCollection.find(documentToFind);
    let doCount = accountsCollection.countDocuments(documentToFind);
    await result.forEach((doc) => console.log(doc));
    console.log(`Found ${await doCount} documents`);
  } catch (err) {
    console.error(`Error finding the document: ${err}`);
  } finally {
    await client.close();
  }
};

main();
