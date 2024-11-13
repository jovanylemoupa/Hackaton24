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
public class Preference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TypeDeLogement typeDeLogement; // Changed to enum

    private Double budget;
    private String localisation;
    private Double diametre;
    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
}
