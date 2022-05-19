const pollValidation = (req, res, next) => {
    const {title} = req.body;
    let {expireAt} = req.body;

    if(!title) {
        res.sendStatus(422)
    }

    if(!expireAt) {
        expireAt = 30*24*60*60*1000;
    }

    console.log(expireAt);

    next();
}

const choiceValidation = (req, res, next) => {

}

export { pollValidation, choiceValidation }