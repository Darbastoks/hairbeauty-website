const mongoose = require('mongoose');
const uri = "mongodb://admin:2EzPxD6BwTHr@ac-aurq76w-shard-00-00.uvfulm0.mongodb.net:27017,ac-aurq76w-shard-00-01.uvfulm0.mongodb.net:27017,ac-aurq76w-shard-00-02.uvfulm0.mongodb.net:27017/hairbeauty?ssl=true&replicaSet=atlas-q75bjm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

console.log("Attempting legacy connection to Greta's old cluster...");
mongoose.connect(uri)
    .then(() => {
        console.log("✅ Legacy Connected to Greta's Old Cluster");
        process.exit(0);
    })
    .catch(e => {
        console.error("❌ Legacy Failed:", e.message);
        process.exit(1);
    });
