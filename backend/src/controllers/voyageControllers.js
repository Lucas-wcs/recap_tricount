const models = require("../models");

const sortByAmount = (voyageurA, voyageurB) => {
    if(voyageurA.total < voyageurB.total) {
        return 1
    } else if (voyageurA.total > voyageurB.total) {
        return -1
    } else {
        return 0
    }
}
const browse = async (req, res) => {
    try {

        const [voyages] = await models.voyage.findAll()

        console.log(voyages)
        const tempVoyages = []

        voyages.forEach((voyage) => {
            const findIndex = tempVoyages.findIndex((voy) => voy.id === voyage.voyage_id)

            if(findIndex === -1) {
                //pas trouve
                if(voyage.depense_id === null) {
                    const newVoyage = {
                        id: voyage.voyage_id,
                        nom: voyage.voyage_nom,
                        depense: []
                    }
                    tempVoyages.push(newVoyage)
                } else {
                    const newVoyage = {
                        id: voyage.voyage_id,
                        nom: voyage.voyage_nom,
                        depense: [
                            {
                                id: voyage.depense_id,
                                libelle: voyage.libelle,
                                montant: voyage.montant,
                                voyageurNom: voyage.voyageur_nom,
                                voyageurId: voyage.voyageur_id,
                            }
                        ]
                    }
                    tempVoyages.push(newVoyage)
                }


            } else {
                if(voyage.depense_id !== null) {
                    tempVoyages[findIndex].depense.push(
                        {
                            id: voyage.depense_id,
                            libelle: voyage.libelle,
                            montant: voyage.montant,
                            voyageurNom: voyage.voyageur_nom,
                            voyageurId: voyage.voyageur_id
                        }
                    )
                }
            }

        })

        tempVoyages.forEach((voyage, index) => {
            let voyageurs = []
            voyage.depense.forEach((depense) => {
                const findVoyageurIndex = voyageurs.findIndex((voyageur) => voyageur.voyageurId === depense.voyageurId)
                if(findVoyageurIndex === -1) {
                    voyageurs.push({
                        voyageurId: depense.voyageurId,
                        voyageurNom: depense.voyageurNom,
                        total: depense.montant
                    })
                } else {
                    voyageurs[findVoyageurIndex].total += depense.montant
                }
            })

            voyageurs = voyageurs.sort(sortByAmount)
            tempVoyages[index].voyageurs = voyageurs
        })

        res.status(200).send(tempVoyages)

    } catch(e) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}

const add = async (req, res) => {
    try {

        const [result] = await models.voyage.insert(req.body.nom)
        if(result.insertId) {
            const newVoyage = {
                id: result.insertId,
                nom: req.body.nom
            }

            res.status(201).send(newVoyage)
        } else {
            res.sendStatus(403)
        }


    } catch(e) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}


module.exports = {
    browse,
    add
}