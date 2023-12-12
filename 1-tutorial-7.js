// deleting a doc from a collection

const { MongoClient, ObjectId } = require("mongodb");
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

const docToDelete = { _id: new ObjectId("6577c31b60e1e4b5ebda0dfb") };
const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountCollection.deleteOne(docToDelete);
    result.deletedCount === 1
      ? console.log("Deleted one document")
      : console.log("No doc deleted");
  } catch (err) {
    console.error(`Error deleting the doc: ${err}`);
  } finally {
    await client.close();
  }
};

main();
