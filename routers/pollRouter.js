import { Router } from "express";
import { pollValidation } from "../middlewares/validations.js";
import { postPoll, getPolls } from "../controllers/pollController.js";

const pollRouter = Router();

pollRouter.post("/poll", pollValidation, postPoll);
pollRouter.get("/poll", getPolls);

export default pollRouter;