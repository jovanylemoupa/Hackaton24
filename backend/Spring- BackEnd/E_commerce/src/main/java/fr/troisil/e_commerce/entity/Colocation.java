package fr.troisil.e_commerce.entity;

import jakarta.persistence.Entity;

@Entity
public class Colocation extends Logement {
    private int nbrColocataires;
    private int nbrChambres;

    // Constructeur, getters et setters
}

