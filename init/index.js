const mongoose= require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/RentRover";

main().then(()=>{
    console.log("DB connected");
}).catch(()=>{
    console.log("error");
})

async function main(){
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({}); 
    initdata.data = initdata.data.map((obj) => ({
      ...obj, owner : "66ee7ea667f453eaad6ae422"
  }));
     
    await Listing.insertMany(initdata.data);
    
}

initDB();
