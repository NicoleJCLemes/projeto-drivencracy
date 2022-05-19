import db from "../db.js";

export async function postPoll(req, res) {
    const {title} = req.body;
    console.log(req.body)
    try {
        await db.collection("polls").insertOne({
            title,
            expireAt
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