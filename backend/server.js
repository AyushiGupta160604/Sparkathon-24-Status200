require('dotenv').config(); // This should be at the top of your entry file

const express = require("express");
const router = require("../backend/router/authrouter.js");
const cors=require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
const corsOptions = {
        origin: [ 'http://localhost:5173'],
        methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    };
    
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', router); 

const port = process.env.PORT || 7000;

 app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
})

