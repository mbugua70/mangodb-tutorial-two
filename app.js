const  {MongoClient} = require('mongodb')

// our database connction string
const uri = require('./atlas_uri')

console.log(uri)

// mangodb uri instance
const client = new MongoClient(uri)

const dbname = 'bank'


// db connection

const connectToDatabase = async() =>{
    try{
        // initializing the connection to the database
        await client.connect();
        console.log(`Connected to the ${dbname} database`)
    }catch(err){
        console.error(`Error connecting to the ${dbname} database: ${err}`)
    }
}

const main = async () =>{
    try{
        await connectToDatabase();
        const databaselist = await client.db().admin().listDatabases();
        databaselist.databases.forEach(db => console.log(db.name))

    }catch(err){
        console.error(`Error connecting to the database: ${err}`);
    }finally{
        await client.close()
    }
}

// run the main function
main();
