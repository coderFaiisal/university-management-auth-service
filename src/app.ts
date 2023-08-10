import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// testing purpose
app.get("/", (req: Request, res: Response) => {
  res.send("Working Successfully");
});

export default app;
