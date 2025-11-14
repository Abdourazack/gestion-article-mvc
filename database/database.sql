-- Création de la base de données
CREATE DATABASE IF NOT EXISTS gestion_articles DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Utilisation de la base
USE gestion_articles;

-- Suppression des tables si elles existent déjà (pour éviter les doublons lors de tests)
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS types;

-- Création de la table 'types'
CREATE TABLE types (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

-- Insertion de types d'articles
INSERT INTO types (nom) VALUES 
('Électronique'),
('Mobilier'),
('Livre'),
('Vêtement');

-- Création de la table 'articles'
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    photo VARCHAR(255),
    prix DECIMAL(10, 2) NOT NULL,
    type_id INT,
    FOREIGN KEY (type_id) REFERENCES types(type_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Insertion d'exemples d'articles (facultatif pour tests initiaux)
INSERT INTO articles (titre, description, photo, prix, type_id) VALUES
('Téléphone Samsung', 'Téléphone dernier cri avec écran AMOLED', 'images/samsung.jpg', 699.99, 1),
('Canapé 3 places', 'Canapé en tissu gris moderne', 'images/canape.jpg', 899.50, 2),
('Jean Slim', 'Jean bleu taille 42', 'images/jean.jpg', 49.90, 3),
('Harry Potter Tome 1', 'Livre fantastique', 'images/harrypotter.jpg', 19.99, 4);
