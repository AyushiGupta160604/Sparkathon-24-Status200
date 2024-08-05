const express = require("express");
const router = require("../backend/router/authrouter.js");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use(express.json());
app.use('/api', router); 

const port = process.env.PORT || 5000;

 app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
})

