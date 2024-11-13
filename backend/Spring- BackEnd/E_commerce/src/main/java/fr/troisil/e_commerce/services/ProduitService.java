package fr.troisil.e_commerce.services;


import fr.troisil.e_commerce.entity.Produit;
import fr.troisil.e_commerce.repositories.IProduitRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor

public class ProduitService implements IProduitService {


    private IProduitRepository produitRepository;

    @Override
    public Produit addProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public Produit updateProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public void delete(Long numProd) {
        produitRepository.deleteById(numProd);
    }

    @Override
    public Produit getById(Long numProd) {
        return produitRepository.findById(numProd).orElse(null);
    }

    @Override
    public List<Produit> getAll() {
        return  produitRepository.findAll();
    }


    @Override
    public List<Produit> searchByCriteria(Map<String, String> criteria) {
        String nom = criteria.get("nom");
        String description = criteria.get("description");
        String prixMinStr = criteria.get("prixMin");
        String prixMaxStr = criteria.get("prixMax");

        // Convertir les prix en nombres si fournis
        BigDecimal prixMin = null;
        BigDecimal prixMax = null;

        // Check and convert prixMin
        if (prixMinStr != null && !prixMinStr.trim().isEmpty()) {
            try {
                prixMin = new BigDecimal(prixMinStr);
            } catch (NumberFormatException e) {
                // Ignore invalid format and keep prixMin as null
            }
        }

        // Check and convert prixMax
        if (prixMaxStr != null && !prixMaxStr.trim().isEmpty()) {
            try {
                prixMax = new BigDecimal(prixMaxStr);
            } catch (NumberFormatException e) {
                // Ignore invalid format and keep prixMax as null
            }
        }

        // Appliquer la logique de filtrage selon les critères
        return produitRepository.findByCriteria(nom, description, prixMin, prixMax);
    }
    // New method to filter products with significant discount
     @Override
    public List<Produit> getBigDealProduits(double remiseThreshold) {
        // Use the repository method to fetch "Big Deal" products
        return produitRepository.findBigDealProduits(BigDecimal.valueOf(remiseThreshold));
    }






}
