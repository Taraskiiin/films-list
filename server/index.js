import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoute from "./routes/movieRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Api is running...");
});

app.use("/api", movieRoute);

app.listen(port, () => {
    console.log(`Server run on port: ${port}`);
});
