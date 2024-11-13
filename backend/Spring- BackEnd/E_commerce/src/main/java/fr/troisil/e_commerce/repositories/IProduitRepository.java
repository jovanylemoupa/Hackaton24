package fr.troisil.e_commerce.repositories;

import fr.troisil.e_commerce.entity.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface IProduitRepository extends JpaRepository<Produit, Long>
{


    @Query("SELECT p FROM Produit p WHERE " // On sélectionne tous les produits "p" dans la base de données
            + "(:nom IS NULL OR p.nom LIKE %:nom%) AND " // Si le nom est fourni, on vérifie si le produit a un nom qui contient ce critère
            + "(:description IS NULL OR p.description LIKE %:description%) AND " // Si la description est fournie, on vérifie si la description du produit contient ce critère
            + "(:prixMin IS NULL OR p.prix >= :prixMin) AND " // Si le prix minimum est fourni, on filtre pour ne garder que les produits dont le prix est supérieur ou égal à ce minimum
            + "(:prixMax IS NULL OR p.prix <= :prixMax)") // Si le prix maximum est fourni, on filtre pour ne garder que les produits dont le prix est inférieur ou égal à ce maximum
    List<Produit> findByCriteria(@Param("nom") String nom, // Le paramètre pour le critère du nom
                                 @Param("description") String description, // Le paramètre pour le critère de description
                                 @Param("prixMin") BigDecimal prixMin, // Le paramètre pour le critère du prix minimum
                                 @Param("prixMax") BigDecimal prixMax // Le paramètre pour le critère du prix maximum
                                  ); // Paramètre pour gérer la pagination (nombre de résultats par page)


    @Query("SELECT p FROM Produit p WHERE p.remise >= :remiseThreshold ORDER BY p.remise DESC")
    List<Produit> findBigDealProduits(@Param("remiseThreshold") BigDecimal remiseThreshold);

}