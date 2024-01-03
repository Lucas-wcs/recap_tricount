const models = require("../models");
const add = async (req, res) => {
    try {

        if(!req.body.voyageur_id) {

            // créer un nouveau voyageur
            // puis lui insérer la dépense
            const voyageId = req.body.voyage_id

            const [newVoyageur] = await models.voyageur.insert(req.body.nom, voyageId)

            if(newVoyageur.insertId) {

                //créer la dépense et la passer au voyageur
                const {libelle, montant} = req.body

                const [newDepense] = await models.depense.insert(libelle, montant, voyageId, newVoyageur.insertId)

                if(newDepense.insertId) {
                    res.sendStatus(201)
                }

            }


        } else {
            // insérer la dépense au voyageur

            const voyageId = req.body.voyage_id

            const {libelle, montant, voyageur_id : voyageurId} = req.body
            const [newDepense] = await models.depense.insert(libelle, montant, voyageId, voyageurId)

            if(newDepense.insertId) {
                res.sendStatus(201)
            }
        }

    } catch(e) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}


module.exports = {
    add
}