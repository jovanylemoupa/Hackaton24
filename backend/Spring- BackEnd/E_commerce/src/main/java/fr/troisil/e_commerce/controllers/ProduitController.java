package fr.troisil.e_commerce.controllers;

import fr.troisil.e_commerce.entity.Produit;
import fr.troisil.e_commerce.services.IProduitService;
 import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import io.swagger.v3.oas.annotations.Operation;
@RestController
@RequestMapping("/produit")
@RequiredArgsConstructor // Génère un constructeur avec les dépendances finales (produitService)
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitController {
  //  private final IEmailService emailService; // Inject the email service


    private final IProduitService produitService; // Injection du service de produit
    private static final Logger logger = LoggerFactory.getLogger(ProduitController.class); // Logger pour l'enregistrement des actions
    // New method for handling email subscriptions

    @GetMapping("/big-deals")
    @Operation(description = "Get products with significant discount")
    public ResponseEntity<List<Produit>> getBigDealProduits(@RequestParam("remiseThreshold") double remiseThreshold) {
        List<Produit> bigDealProduits = produitService.getBigDealProduits(remiseThreshold);

        // If no products are found, return 404 error
        if (bigDealProduits.isEmpty()) {
            return ResponseEntity.status(404).body(null); // or you can return a custom error message
        }

        return ResponseEntity.ok(bigDealProduits); // Return the list of products if found
    }

    @Operation(description = "email subscription")

    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, String>> subscribe(@RequestBody Map<String, String> emailData) {
        // Extract email from the Map
        String email = emailData.get("email");

        // Print the received email for debugging
        System.out.println("Received email: " + email); // Debugging line

        // Validate the email input
        if (email == null || email.trim().isEmpty()) {
            System.out.println("Email is required"); // Debugging line
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }

        // Optionally validate email format (allowing for quotes)
        if (!email.matches("^\"?[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\"?$")) {
            System.out.println("Invalid email format: " + email); // Debugging line
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid email format"));
        }

        try {
        //    emailService.sendConfirmationEmail(email.replaceAll("\"", "")); // Remove quotes before sending
            System.out.println("Confirmation email sent to: " + email); // Debugging line
            return ResponseEntity.ok(Map.of("message", "Subscription successful. Confirmation email sent."));
        } catch (Exception e) {
            logger.error("Error sending email", e);
            return ResponseEntity.status(500).body(Map.of("message", "Error sending confirmation email"));
        }
    }


    @Operation(description = "Retrieve all Produits")

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAll() {
        logger.info("Fetching all products");
        List<Produit> produits = produitService.getAll();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Products fetched successfully");
        response.put("data", produits);

        return ResponseEntity.ok(response); // Retourne tous les produits avec un message de succès
    }

    @Operation(description = "Add a single Produit")
    @PostMapping("/addsingle")
    public ResponseEntity<Map<String, Object>> addProduit(@Validated @RequestBody Produit produit) {
        logger.info("Adding new product: {}", produit);

        Produit savedProduit = produitService.addProduit(produit);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Product added successfully");
        response.put("data", savedProduit);

        return ResponseEntity.status(HttpStatus.CREATED).body(response); // Retourne 201 Created avec le produit ajouté
    }
    @Operation(description = "Add multiple Produits")
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addProduits(@Validated @RequestBody List<Produit> produits) {
        logger.info("Adding new products: {}", produits);

        List<Produit> savedProduits = new ArrayList<>();
        for (Produit produit : produits) {
            Produit savedProduit = produitService.addProduit(produit);
            savedProduits.add(savedProduit);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Products added successfully");
        response.put("data", savedProduits);

        return ResponseEntity.status(HttpStatus.CREATED).body(response); // Retourne 201 Created avec un message de succès
    }


    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProduit(@RequestParam Map<String, String> criteria) {
        logger.info("Searching products with criteria: {}", criteria);

        // Appel du service avec les critères
        List<Produit> produits = produitService.searchByCriteria(criteria); // Modification ici

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Multi-criteria search completed successfully");
        response.put("data", produits);

        return ResponseEntity.ok(response); // Retourne les résultats avec un message de succès
    }





    @Operation(description = "Update Produit")

    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateProduit(@Validated @RequestBody Produit produit) {
        logger.info("Updating product with ID: {}", produit.getId());
        Produit existingProduit = produitService.getById(produit.getId());

        if (existingProduit == null) {
            logger.warn("Product with ID {} not found", produit.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // Retourne un message d'erreur avec un 404
        }

        Produit updatedProduit = produitService.updateProduit(produit);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Product updated successfully");
        response.put("data", updatedProduit);

        return ResponseEntity.ok(response); // Retourne un message de succès avec le produit mis à jour
    }
    @Operation(description = "Delete Produit by Id")

    @DeleteMapping("/delete/{idProduit}")
    public ResponseEntity<Map<String, Object>> deleteProduit(@PathVariable Long idProduit) {
        logger.info("Deleting product with ID: {}", idProduit);
        Produit produit = produitService.getById(idProduit);

        if (produit == null) {
            logger.warn("Product with ID {} not found", idProduit);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // Retourne un message d'erreur avec un 404
        }

        produitService.delete(idProduit);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Product deleted successfully");

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response); // Retourne 204 No Content avec un message de succès
    }

    @Operation(description = "Retrieve Produit by Id")

    @GetMapping("/get/{idProduit}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long idProduit) {
        logger.info("Fetching product with ID: {}", idProduit);
        Produit produit = produitService.getById(idProduit);

        if (produit == null) {
            logger.warn("Product with ID {} not found", idProduit);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // Retourne un message d'erreur avec un 404
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Product fetched successfully");
        response.put("data", produit);

        return ResponseEntity.ok(response); // Retourne le produit avec un message de succès
    }




}
