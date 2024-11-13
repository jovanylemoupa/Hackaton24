package fr.troisil.e_commerce.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
            public static final String SECRET = "3d68fbe704f22564e2835f6bd16e6fce0b1a53588281f6a02993bc2fd98c9c57";

            public  String generateToken(String email) // Or userName.
            {
                Map<String,Object> claims = new HashMap<>();
                return  createToken(claims,email);
            }

            private String createToken(Map<String,Object> claims, String email)
            {
                return Jwts.builder()
                        .setClaims(claims)
                        .setSubject(email)
                        .setIssuedAt(new Date(System.currentTimeMillis()))
                        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                        .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
            }

            private Key getSignKey(){
//                byte[] keybytes = Decoders.BASE64.decode(SECRET);
//                return Keys.hmacShaKeyFor(keybytes);
                return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

            }

            public String extractUsername(String token)
            {
                return extractClaim(token, Claims::getSubject);
            }

            public <T> T extractClaim(String token, Function<Claims,T> claimsResolver)
            {
                final Claims claims = extractAllClaim(token);
                return claimsResolver.apply(claims);
            }

            private Claims extractAllClaim(String token)
            {
                try {
                    return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
                } catch (Exception e) {
                    throw new RuntimeException("Erreur lors de l'extraction des claims du token", e);
                }

//                return Jwts.parser().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
            }

            private Boolean isTokenExpired(String token)
            {
                return extractExpiration(token).before(new Date());
            }

            public Date extractExpiration(String token)
            {
                return extractClaim(token,Claims::getExpiration);
            }

            public Boolean validateToken(String token, UserDetails userDetails)
            {
                final String email = extractUsername(token);
                return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
            }
}
