const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);

const dbname = "bank";
const collection_name = "accounts";
const accountsCollection = client.db(dbname).collection(collection_name);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected successfully to the ${dbname} database`);
  } catch (err) {
    console.error(`Failed to connect to the ${dbname} database`);
  }
};

const pipeline = [
  { $match: { account_type: "checking", balance: { $gt: 300000 } } },
  {
    // ordering the alc in descending order
    $sort: { balance: -1 },
  },
  {
    $project: {
      _id: 0,
      account_type: 1,
      account_id: 1,
      balance: 1,
      gbp_balance: { $divide: ["$balance", 1.3] },
    },
  },
];

const main = async () => {
  try {
    await connectToDatabase();
    let results = await accountsCollection.aggregate(pipeline).toArray();
    for (const docs of results) {
      console.log(docs);
    }
  } catch (err) {
    console.error(`Error connecting to database ${err}`);
  } finally {
    await client.close();
  }
};

main();
