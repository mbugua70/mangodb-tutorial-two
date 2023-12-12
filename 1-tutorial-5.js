const { MongoClient, ObjectId } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);

const dbname = "bank";
const collection = "accounts";

const accountsCollection = client.db(dbname).collection(collection);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
  } catch (err) {
    console.error(`Failed to the connect to the ${dbname} database`);
  }
};

const docQuery = { _id: new ObjectId("6572746043f3c4425bdec190") };
const updateInstru = { $inc: { balance: 500 } };

const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountsCollection.updateOne(docQuery, updateInstru);
    result.modifiedCount === 1
      ? console.log("Updated one document")
      : console.log("No doc updated");
  } catch (err) {
    console.error(`Error updating the doc: ${err}`);
  } finally {
    await client.close();
  }
};

main();
