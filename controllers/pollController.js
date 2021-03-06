import db from "../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function postPoll(req, res) {
    const {title, expireAt} = req.body;
    console.log(req.body)
    try {
        await db.collection("polls").insertOne({
            title,
            expireAt: expireAt || dayjs().add(30, "day").format("YYYY-MM-D hh:mm")
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
        const pollChoices = await db.collection("choices").find({pollId: id}).toArray();
        res.send(pollChoices);
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getPollResult(req, res) {
    const {id} = req.params;

    try {

        const pollResults = await db.collection("polls").findOne({_id: new ObjectId(id)});

        const {title} = pollResults;

        const result = await db.collection("votes").find({pollId: id}).toArray();

        result.sort((a, b) => {
            return b.amount - a.amount
        });

        const mostVoted = await db.collection("choices").findOne({_id: new ObjectId(result[0].optionId)});

        if (result[0].amount === result[1].amount) {
            res.send("Não houve uma opção vencedora!");
            return
        }

        res.send({
            title,
            result: {
                title: mostVoted.title,
                votes: result[0].amount
            }
        });
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}