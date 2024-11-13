package fr.troisil.e_commerce.entity;

import jakarta.persistence.*;

@Entity
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @ManyToOne
    @JoinColumn(name = "logement_id", nullable = false)
    private Logement logement;

    // Constructeur, getters et setters
}

