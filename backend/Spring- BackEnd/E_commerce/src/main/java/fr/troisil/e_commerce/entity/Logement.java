package fr.troisil.e_commerce.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Logement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double prix;
    private String description;
    private double surface;
    private String localisation;
    private String statut;
    private boolean meuble;
    private double caution;
    private boolean accepte;
    private boolean dispo;
    @Enumerated(EnumType.STRING)

    private TypeDeLogement type;

    @ManyToOne
    @JoinColumn(name = "bailleur_id", nullable = false)
    private Bailleur bailleur;

    @OneToMany(mappedBy = "logement", cascade = CascadeType.ALL)
    private List<Media> medias;

    // Constructeur, getters et setters
}
