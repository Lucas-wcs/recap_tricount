CREATE TABLE voyage(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(50)
);


CREATE TABLE voyageur(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(50),
    voyage_id INT,
    CONSTRAINT FOREIGN KEY (voyage_id) REFERENCES voyage(id)
);


CREATE TABLE depense(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    libelle VARCHAR(50),
    montant INT,
    voyage_id INT,
    voyageur_id INT,
    CONSTRAINT FOREIGN KEY (voyage_id) REFERENCES voyage(id),
    CONSTRAINT FOREIGN KEY (voyageur_id) REFERENCES voyageur(id)
);