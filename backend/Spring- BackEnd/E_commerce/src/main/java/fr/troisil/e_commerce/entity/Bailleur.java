package fr.troisil.e_commerce.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Bailleur extends Personne {

    // Additional attributes specific to Bailleur can be added here
    @OneToMany(mappedBy = "bailleur", cascade = CascadeType.ALL)
    private List<Logement> logements;
}
