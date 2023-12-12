// deleting a doc from a collection

const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);

const dbname = "bank";
const collection_name = "accounts";

const accountCollection = client.db(dbname).collection(collection_name);

// databse connection

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
  } catch (err) {
    console.error(`Failed to connect to the ${dbname} database`);
  }
};

const docsToDelete = { balance: { $lt: 10000 } };
const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountCollection.deleteMany(docsToDelete);
    result.deletedCount > 0
      ? console.log(`Deleted ${result.deletedCount} docs`)
      : console.log("No docs deleted");
  } catch (err) {
    console.error(`Error deleting the doc: ${err}`);
  } finally {
    await client.close();
  }
};

main();
