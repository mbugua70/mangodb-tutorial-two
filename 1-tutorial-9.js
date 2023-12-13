const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);

// collections
const accounts = client.db("bank").collection("accounts");
const transfers = client.db("bank").collection("transfers");

// accounts transaction information

let account_id_sender = "jh350jfj54886";
let account_id_receiver = "jg356ljl43463";
let transaction_amount = 10000;

// start session

const session = client.startSession();

// we will use withTransaction to start the transaction, exercute the callback function, and commit the transaction
// the callback for withTransacton must be async or await function
// each individual operation must be awaited

const main = async () => {
  try {
    const transactionResult = await session.withTransaction(async () => {
      // step 1. update the sender balance
      const updateSenderResult = await accounts.updateOne(
        { account_id: account_id_sender },
        { $inc: { balance: -transaction_amount } },
        { session }
      );
      console.log(
        `${updateSenderResult.matchedCount} documents matched the filter, updated ${updateSenderResult.modifiedCount} document(s) for the sender account`
      );

      // step 2 update for the receiver balance

      const updateReceiverResult = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $inc: { balance: transaction_amount } },
        { session }
      );
      console.log(
        `${updateReceiverResult.matchedCount} documents(s) matched the filter, updated ${updateReceiverResult.modifiedCount} documents(s) for the receiver accounts`
      );

      // inserting the transfer documents
      const transfer = {
        transfer_id: "TR1234343l3",
        amount: 100,
        from_account: account_id_sender,
        to_account: account_id_receiver,
      };

      const insertTransferResult = await transfers.insertOne(transfer, {
        session,
      });
      console.log(
        `Successfuly inserted ${insertTransferResult.insertedId} into the transfers collection`
      );

      // step 4: updating the transfer_complete field for the sender
      const updateSenderTransferResult = await accounts.updateOne(
        { account_id: account_id_sender },
        { $push: { transfer_complete: transfer.transfer_id } },
        { session }
      );
      console.log(
        `${updateSenderTransferResult.matchedCount} documents matched the transfer collection, updated ${updateSenderTransferResult.modifiedCount} documents`
      );

      //    step 5: updating the transfer_complete field for receiver

      const updateReceiverTransferResult = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $push: { transfer_complete: transfer.transfer_id } }
      );
      console.log(
        `${updateReceiverTransferResult.matchedCount} documents matched the transfer collection, updated ${updateReceiverTransferResult.modifiedCount} documents`
      );
    });
    console.log("Committing .....");
    if (transactionResult) {
      console.log("The reservaton was successfuly created");
    } else {
      console.log("The transaction was intentionally aborted");
    }
  } catch (err) {
    console.error(`Transaction was aborted ${err}`);
    process.exit(1);
  } finally {
    await session.endSession();
    await client.close();
  }
};

main();
