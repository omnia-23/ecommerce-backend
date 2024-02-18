import express from "express";
import dotenv from 'dotenv'
import { v2 as cloudinary } from "cloudinary";
import { bootstrap } from "./bootstrap.js";
import { connectionToDB } from "./database/dbConnection.js";
const app = express();
const port = 3000;

dotenv.config()
         
cloudinary.config({ 
  cloud_name: 'dozpvfqyd', 
  api_key: '759376222435966', 
  api_secret: 'p7rNiGVwlef8GqTDYgmX2ADY1DM' 
});

bootstrap(app);

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
//   });
connectionToDB();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
