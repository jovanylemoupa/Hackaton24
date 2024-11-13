package fr.troisil.e_commerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ECommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ECommerceApplication.class, args);
    }

}
/*
[
  {
    "nom": "Panneaux solaires",
    "description": "Panneaux solaires pour une énergie renouvelable et durable.",
    "prix": 299.99,
    "quantite": 50,
    "image": "panneaux_solaires.jpeg",
    "remise": 10.0
  },
  {
    "nom": "Bouteille en acier inoxydable",
    "description": "Bouteille réutilisable en acier inoxydable, idéale pour réduire les déchets plastiques.",
    "prix": 19.99,
    "quantite": 200,
    "image": "bouteille_acier.jpg",
    "remise": 5.0
  },
  {
    "nom": "Sac en jute",
    "description": "Sac en jute durable et réutilisable pour vos courses.",
    "prix": 12.50,
    "quantite": 150,
    "image": "sac_jute.jpg",
    "remise": 7.5
  },
  {
    "nom": "Ampoule LED",
    "description": "Ampoule LED économe en énergie avec une durée de vie prolongée.",
    "prix": 8.99,
    "quantite": 300,
    "image": "ampoule_led.jpg",
    "remise": 3.0
  },
  {
    "nom": "Savon bio",
    "description": "Savon naturel et bio, sans produits chimiques ajoutés.",
    "prix": 6.50,
    "quantite": 80,
    "image": "savon_bio.jpeg",
    "remise": 15.0
  },
  {
    "nom": "Fertiliser organique",
    "description": "Fertilisant organique pour un jardinage respectueux de l'environnement.",
    "prix": 15.00,
    "quantite": 60,
    "image": "fertiliser_organique.png",
    "remise": 8.0
  }
]



*/
/*
INSERT INTO produit (nom, description, prix, quantite, image, remise) VALUES
('Panneaux solaires', 'Panneaux solaires pour une énergie renouvelable et durable.', 299.99, 50, 'panneaux_solaires.jpeg', 10.0),
('Bouteille en acier inoxydable', 'Bouteille réutilisable en acier inoxydable, idéale pour réduire les déchets plastiques.', 19.99, 200, 'bouteille_acier.jpg', 5.0),
('Sac en jute', 'Sac en jute durable et réutilisable pour vos courses.', 12.50, 150, 'sac_jute.jpg', 7.5),
('Ampoule LED', 'Ampoule LED économe en énergie avec une durée de vie prolongée.', 8.99, 300, 'ampoule_led.jpg', 3.0),
('Savon bio', 'Savon naturel et bio, sans produits chimiques ajoutés.', 6.50, 80, 'savon_bio.jpeg', 15.0),
('Fertiliser organique', 'Fertilisant organique pour un jardinage respectueux de l\'environnement.', 15.00, 60, 'fertiliser_organique.png', 8.0);

*/