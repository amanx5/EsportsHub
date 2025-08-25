import { MongoClient } from 'mongodb'

let dbClient = null;
let db = null;
function connectWithDB() {
    // Connection URL
    const url = 'mongodb://localhost:27017';
    dbClient = new MongoClient(url);

    // Database Name
    const dbName = 'esportshub';

    
    async function main() {
        // Use connect method to connect to the server
        await dbClient.connect();
        console.log('Connected successfully to database');
        
        db = dbClient.db(dbName);
        
        addCleaners();
        
        return 'done.';
    }
    
    function addCleaners() {
        process.on("SIGINT", async () => {
            await client.close();
            console.log("MongoDB connection closed");
            process.exit(0);
        });

        process.on("SIGTERM", async () => {
            await client.close();
            console.log("MongoDB connection closed on SIGTERM");
            process.exit(0);
        });
    }
    
    main()
        .then(console.log)
        .catch(console.error)
        .finally(() => {
            // client.close()
        });
}


export {db};
export default connectWithDB;