package fr.troisil.e_commerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;

    @Enumerated(EnumType.STRING)
    private Categorie categorie;

    private String etat;

    @ManyToOne
    @JoinColumn(name = "personne_id") // Optional, defines the foreign key column name in the Article table
    private Personne proprietaire;
}
