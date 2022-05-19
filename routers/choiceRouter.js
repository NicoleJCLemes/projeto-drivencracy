import { Router } from "express";
import { choiceValidation } from "../middlewares/validations.js";
import { postChoices } from "../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post("/choice", choiceValidation, postChoices);

export default choiceRouter;