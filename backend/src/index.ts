import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import custumerRouter from "./routes/customer.route";
import cors from "cors";



const app = express();
dotenv.config();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json());

app.use("/", custumerRouter);


app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Unknow error";
    let status = 400;
    if (error) {
        errorMessage = error.message;
    }
    res.status(status).json({ error: errorMessage })
});

mongoose.connect(process.env.MONGO_LINK)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(process.env.PORT, () => {
            console.log("Server running on port: " + process.env.PORT);
        });
    })
    .catch(console.error);


