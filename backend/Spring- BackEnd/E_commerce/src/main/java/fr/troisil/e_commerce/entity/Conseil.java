package fr.troisil.e_commerce.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Conseil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CategorieConseil categories;

    private String titre;
    private String description;
    private String localisation;
    private LocalDate datePublication;
    // Many-to-one relationship: A Conseil belongs to one Personne
    @ManyToOne
    @JoinColumn(name = "personne_id") // Foreign key to reference the Personne table
    private Personne personne;
}
