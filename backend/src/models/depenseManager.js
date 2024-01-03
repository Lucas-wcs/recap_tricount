const AbstractManager = require("./AbstractManager");

class DepenseManager extends AbstractManager {
    constructor() {
        super({ table: "depense" });
    }

    findAll() {
        return this.connection.query(`SELECT * FROM ${this.table}`)
    }

    insert(libelle, montant, voyageId, voyageurId) {
        return this.connection.query(`INSERT INTO ${this.table} (libelle, montant, voyage_id, voyageur_id) VALUES (?, ?, ?, ?)`, [libelle, montant, voyageId, voyageurId])
    }
}

module.exports = DepenseManager;
