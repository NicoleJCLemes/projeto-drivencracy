import dayjs from "dayjs";
import Joi from 'joi';
import db from "../db.js";
import { ObjectId } from "mongodb";

const pollValidation = async (req, res, next) => {
    const {title} = req.body;
    let {expireAt} = req.body;

    const isThere = await db.collection("polls").findOne({title});

    if(isThere) {
        res.sendStatus(409);
        return
    }

    if(!expireAt) {
        expireAt = dayjs().add(30, "day").format("YYYY-MM-D hh:mm");
    }

    const dateSchema = Joi.object({
        title: Joi.string().min(1).required(),
        expireAt: Joi.date().iso().required()
    });

    const validation = dateSchema.validate({
        title,
        expireAt
    }, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send({
            error: validation.error.details.map((err) => err.message),
        });
    }

    next();
}

const choiceValidation = async (req, res, next) => {
    const {title, pollId} = req.body;

    const isThere = await db.collection("choices").findOne({title});
    
    if(isThere) {
        res.sendStatus(409);
        return
    }

    const isPoll = await db.collection("polls").findOne({_id: new ObjectId(pollId)});

    if (!isPoll) {
        res.sendStatus(404);
        return
    } 

    if (dayjs().isAfter(dayjs(isPoll.expireAt))) {
        res.sendStatus(403);
        return
    }

    const choiceSchema = Joi.object({
        title: Joi.string().min(1).required(),
        pollId: Joi.string().alphanum().min(1).required()
    })

    const validation = choiceSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send({
            error: validation.error.details.map((err) => err.message),
        });
    }
    
    
    next();
}

const voteValidation = async (req, res, next) => {
    const {id} = req.params;

    const isThere = await db.collection("choices").findOne({_id: new ObjectId(id)});
    const {pollId} = isThere
    
    if(!isThere) {
        res.sendStatus(404);
    } else {
        res.locals.poll = isThere
    }

    const isPoll = await db.collection("polls").findOne({_id: new ObjectId(pollId)})

    if (dayjs().isAfter(dayjs(isPoll.expireAt))) {
        res.sendStatus(403);
        return
    }

    next();
}

export { pollValidation, choiceValidation, voteValidation }