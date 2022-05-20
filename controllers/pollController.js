import db from "../db.js";

export async function postPoll(req, res) {
    const {title} = req.body;
    console.log(req.body)
    try {
        await db.collection("polls").insertOne({
            title
            //expireAt
        });
        res.sendStatus(201);
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getPolls(_req, res) {
    try {
        const allPolls = await db.collection("polls").find({}).toArray();
        res.send(allPolls);
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getPollChoices(req, res) {
    const {id} = req.params;
    try {
        const pollChoices = await db.collection("choices").find({id}).toArray();
        res.send(pollChoices);
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getPollResult(req, res) {
    const {id} = req.params;
    try {
        const pollResults = await db.collection("polls").find({id}).toArray();
        res.send(pollResults);
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}