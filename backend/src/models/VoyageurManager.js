const AbstractManager = require("./AbstractManager");

class VoyageurManager extends AbstractManager {
    constructor() {
        super({ table: "voyageur" });
    }

    findAll() {
        return this.connection.query(`SELECT * FROM ${this.table}`)
    }

    insert(nom, voyageId) {
        return this.connection.query(`INSERT INTO ${this.table} (nom, voyage_id) VALUES (?, ?)`, [nom, voyageId])
    }
}

module.exports = VoyageurManager;
