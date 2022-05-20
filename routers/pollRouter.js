import { Router } from "express";
import { pollValidation } from "../middlewares/validations.js";
import { postPoll, getPolls, getPollChoices, getPollResult } from "../controllers/pollController.js";

const pollRouter = Router();

pollRouter.post("/poll", pollValidation, postPoll);
pollRouter.get("/poll", getPolls);
pollRouter.get("/poll/:id/choice", getPollChoices);
pollRouter.get("/poll/:id/result", getPollResult);

export default pollRouter;