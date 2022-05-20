import { Router } from "express";
import { choiceValidation, voteValidation } from "../middlewares/validations.js";
import { postChoices, postVote } from "../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post("/choice", choiceValidation, postChoices);
choiceRouter.post("/choice/:id/vote", voteValidation, postVote); 

export default choiceRouter;