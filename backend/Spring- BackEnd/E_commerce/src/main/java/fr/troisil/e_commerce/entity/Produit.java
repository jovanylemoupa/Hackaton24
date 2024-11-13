package fr.troisil.e_commerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Produit  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique du produit

    @NotBlank(message = "Le nom du produit ne peut pas être vide")
    private String nom; // Nom du produit

    @NotBlank(message = "La description du produit ne peut pas être vide")
    private String description; // Description du produit

    @NotNull(message = "La quantité ne peut pas être nulle")
    @DecimalMin(value = "0", message = "La quantité doit être supérieure ou égale à zéro")
    private Long quantite; // Quantité disponible

    @NotNull(message = "Le prix ne peut pas être nul")
    @DecimalMin(value = "0.0", message = "Le prix doit être supérieur ou égal à zéro")
    private BigDecimal prix; // Prix du produit

    private String image; // URL ou chemin de l'image du produit

    @DecimalMin(value = "0.0", message = "La remise doit être supérieure ou égale à zéro")
    @DecimalMax(value = "100.0", message = "La remise ne peut pas dépasser 100")
    private BigDecimal remise; // Remise sur le produit (en pourcentage)

    @Override
    public String toString() {
        return "Produit{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", description='" + description + '\'' +
                ", quantite=" + quantite +
                ", prix=" + prix +
                ", image='" + image + '\'' +
                ", remise=" + remise +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Produit)) return false;
        Produit produit = (Produit) o;
        return Objects.equals(id, produit.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
