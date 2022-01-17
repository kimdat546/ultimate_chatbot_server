require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth");
const intentRoutes = require("./routes/intent");
const questionRoutes = require("./routes/question");
const PORT = process.env.PORT || 5000;

const connectUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.2qttl.mongodb.net/${process.env.DB_CLUSTER}?retryWrites=true&w=majority`;
const connectDB = async () => {
    try {
        await mongoose.connect(connectUrl, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("connect database successfully");
    } catch (error) {
        console.log("connect database error " + error);
        process.exit(1);
    }
};

app.get("/", (req, res) => {
    res.send("auth chatbot");
});
app.use("/api/auth", authRoutes) ;
app.use("/api/intents", intentRoutes);
app.use("/api/questions", questionRoutes);
connectDB();

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
