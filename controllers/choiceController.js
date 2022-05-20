import dayjs from "dayjs";
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

export async function postVote(req, res) {
    const {id} = req.params;
    const pollId = res.locals.poll;
    
    try {

        const chosen = await db.collection("votes").findOne({optionId: id});
        if (!chosen) {
            await db.collection("votes").insertOne({
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                optionId: id,
                pollId: pollId.pollId,
                amount: 1
            });
 

        } else {

            await db.collection("votes").updateOne({optionId: id}, {$inc: {amount: 1}});
            
        }

        res.sendStatus(201);
        
    } catch (error) {

        console.log(error);
        res.status(500).send("Não foi possível enviar seu voto!");
        
    }

}