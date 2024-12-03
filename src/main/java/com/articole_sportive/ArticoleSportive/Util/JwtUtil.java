package com.articole_sportive.ArticoleSportive.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import io.github.cdimascio.dotenv.Dotenv;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
    private final String SECRET_KEY = Dotenv.load().get("JWT_SECRET_KEY"); // Cheia secretă stocată în .env
    private final long JWT_EXPIRATION_MS = 86400000; // 24 de ore (în milisecunde)
    public String generateToken(String email, Long idUtilizator, String rol) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("idUtilizator", idUtilizator);
        claims.put("rol", rol);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_MS))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public Long extractIdUtilizator(String token) {
        return extractAllClaims(token).get("idUtilizator", Long.class);
    }
    public String extractRol(String token) {
        return extractAllClaims(token).get("rol", String.class);
    }
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}
