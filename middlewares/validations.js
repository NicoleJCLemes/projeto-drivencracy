import dayjs from "dayjs";
import db from "../db.js";
import { ObjectId } from "mongodb";

const pollValidation = async (req, res, next) => {
    const {title} = req.body;
    //let {expireAt} = req.body;

    if(!title) {
        res.sendStatus(422);
    }

    const isThere = await db.collection("polls").findOne({title});

    if(isThere) {
        res.sendStatus(409);
    }

    /*if(!expireAt) {
        expireAt = dayjs().add(30, "day").format("YYYY-MM-D hh:mm");
        console.log(expireAt);
    }*/

    next();
}

const choiceValidation = async (req, res, next) => {
    const {title, pollId} = req.body;

    if(!title) {
        res.sendStatus(422);
    }

    const isThere = await db.collection("choices").findOne({title});
    
    if(isThere) {
        res.sendStatus(409);
    }
    
    const isPoll = await db.collection("polls").findOne({_id: new ObjectId(pollId)});

    if (!isPoll) {
        res.sendStatus(404);
    }

    next();
}

const voteValidation = async (req, res, next) => {
    const {id} = req.body

    const isThere = await db.collection("choices").findOne({_id: new ObjectId(id)});
    
    if(!isThere) {
        res.sendStatus(404);
    }

    next();
}

export { pollValidation, choiceValidation, voteValidation }