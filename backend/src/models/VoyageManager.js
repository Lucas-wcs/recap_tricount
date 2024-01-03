const AbstractManager = require("./AbstractManager");

class VoyageManager extends AbstractManager {
    constructor() {
        super({ table: "voyage" });
    }

    findAll() {
        return this.connection.query(`
            SELECT voyage.id AS voyage_id, voyage.nom AS voyage_nom, voyageur.id AS voyageur_id, voyageur.nom AS voyageur_nom, depense.id AS depense_id, depense.libelle, depense.montant
            FROM ${this.table}
            LEFT JOIN voyageur ON voyageur.voyage_id=voyage.id
            LEFT JOIN depense ON depense.voyageur_id=voyageur.id AND depense.voyage_id=voyage.id
        `)
    }

    insert(nom) {
        return this.connection.query(`INSERT INTO ${this.table} (nom) VALUES (?)`, [nom])
    }
}

module.exports = VoyageManager;
