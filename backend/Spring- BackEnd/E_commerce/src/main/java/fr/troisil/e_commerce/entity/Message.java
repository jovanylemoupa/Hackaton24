package fr.troisil.e_commerce.entity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contenu;
    private LocalDate dateEnvoi;

    @ManyToOne
    private Personne expediteur;

    @ManyToOne
    private Personne destinataire;

    // Other attributes and methods
}
