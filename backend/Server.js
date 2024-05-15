const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/AuthRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/ToDoRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("MongoDB Connected ...")
}).catch((err) => {
    console.log(err);
});

app.use("/api", routes);
app.use('/auth', authRoutes);

app.use("/", (req,res) => {
    res.send("Hi")
})

app.listen(PORT, ()=> {
    console.log(`Listening at ${PORT}...`)
});