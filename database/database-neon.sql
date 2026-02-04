-- PostgreSQL (Neon) - pas besoin de CREATE DATABASE / USE

DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS types;

CREATE TABLE types (
  type_id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
);

INSERT INTO types (nom) VALUES
('Électronique'),
('Mobilier'),
('Livre'),
('Vêtement');

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  photo VARCHAR(255),
  prix DECIMAL(10,2) NOT NULL,
  type_id INT REFERENCES types(type_id) ON DELETE SET NULL
);

INSERT INTO articles (titre, description, photo, prix, type_id) VALUES
('Téléphone Samsung', 'Téléphone dernier cri avec écran AMOLED', 'images/samsung.jpg', 699.99, 1),
('Canapé 3 places', 'Canapé en tissu gris moderne', 'images/canape.jpg', 899.50, 2),
('Jean Slim', 'Jean bleu taille 42', 'images/jean.jpg', 49.90, 4),
('Harry Potter Tome 1', 'Livre fantastique', 'images/harrypotter.jpg', 19.99, 3);
