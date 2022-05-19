import db from "../db.js";

export async function postChoices(req, res) {
    const {title, pollId} = req.body;

    try {
        await db.collection("choices").insertOne({
            title,
            pollId
        });
        res.sendStatus(201);
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}