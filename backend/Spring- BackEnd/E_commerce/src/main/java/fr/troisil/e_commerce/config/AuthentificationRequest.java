package fr.troisil.e_commerce.config;

import lombok.Data;

@Data
public class AuthentificationRequest {

    private String username;
    private String password;
}
