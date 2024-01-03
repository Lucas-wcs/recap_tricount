const models = require("../models");
const browse = async (req, res) => {
    try {

        const [voyageurs] = await models.voyageur.findAll()

        res.status(200).send(voyageurs)

    } catch(e) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}

module.exports = {
    browse
}