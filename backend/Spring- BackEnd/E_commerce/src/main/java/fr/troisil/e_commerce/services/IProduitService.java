package fr.troisil.e_commerce.services;

import fr.troisil.e_commerce.entity.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface IProduitService {

    Produit addProduit(Produit produit);
    Produit updateProduit(Produit produit);
    void delete(Long numProd);
    Produit getById(Long numProd);

    List<Produit> getAll();

     public List<Produit> searchByCriteria(Map<String, String> criteria);
    List<Produit> getBigDealProduits(double remiseThreshold);


}
