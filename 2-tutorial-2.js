const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);
const dbname = "bank";

let accounts = client.db("bank").collection("accounts");

const pipeline = [
  { $match: { balance: { $gt: 400000 } } },
  {
    $group: {
      _id: "$account_type",
      total_balance: { $sum: "$balance" },
      average_balance: { $avg: "$balance" },
    },
  },
];

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected successfully to the ${dbname} database`);
  } catch (err) {
    console.error(`Failed to connect to the ${dbname} database`);
  }
};

const main = async () => {
  try {
    await connectToDatabase();
    let results = await accounts.aggregate(pipeline).toArray();
    for (const doc of results) {
      console.log(doc);
    }
  } catch (err) {
    console.error(`Error connecting to the database ${err}`);
  } finally {
    await client.close();
  }
};

main();
