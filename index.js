import express from "express";   //imports
import axios from "axios";

const port = 3000;              //set the port
const app = express();          //start the app

app.use(express.static('public'));  //use public folder for static files

app.get("/", (req, res) =>{       //route to render the index.ejs home page
    res.render("index.ejs");
})

//  WE DO NEED THIS FOR IT TO WORK
app.get("/riddle", async (req, res) => {
    try {
        const response = await axios.get("https://riddles-api.vercel.app/random");
        const { riddle, answer} = response.data;
        res.render("riddle.ejs", { riddle, answer});
    } catch (error) {
      console.error("Error fetching secret:", error);
      res.status(500).send("Error fetching secret");  
    }
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})