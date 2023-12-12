const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);

const dbname = "bank";
const collection = "accounts";
const accountCollection = client.db(dbname).collection(collection);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
  } catch (err) {
    console.error(`Failed to connect to the ${dbname} database`);
  }
};

const docsUpdated = { account_type: "checking" };
const updateTo = { $push: { transfers_complete: " TR13333300039" } };

const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountCollection.updateMany(docsUpdated, updateTo);
    result.modifiedCount > 0
      ? console.log(`Updated ${result.modifiedCount} documents`)
      : console.log("No doc updated");
  } catch (err) {
    console.error(`Error updating the doc: ${err}`);
  } finally {
    await client.close();
  }
};

main();
