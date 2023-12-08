const { MongoClient, ObjectId } = require("mongodb");
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

// finding one doc

let documentToFind = { _id: new ObjectId("6572746043f3c4425bdec190") };

const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountsCollection.findOne(documentToFind);
    console.log(result);
  } catch (err) {
    console.error(`Failed to find the document`);
  } finally {
    await client.close();
  }
};

main();
