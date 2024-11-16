package com.articole_sportive.ArticoleSportive.Controler;

import com.articole_sportive.ArticoleSportive.DTO.CosDTO;
import com.articole_sportive.ArticoleSportive.Entity.Cos;
import com.articole_sportive.ArticoleSportive.Entity.Utilizator;
import com.articole_sportive.ArticoleSportive.Repository.RepositoryUtilizator;
import com.articole_sportive.ArticoleSportive.Service.CosService;
import com.articole_sportive.ArticoleSportive.Util.JwtUtil;
import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cos")
public class CosControler {
    @Autowired
    private CosService cosService;
    @Autowired
    private RepositoryUtilizator repositoryUtilizator;
    private final String SECRET_KEY = Dotenv.load().get("JWT_SECRET_KEY");
    @GetMapping
    public List<CosDTO> obtineCos(@RequestHeader("Authorization") String token) {
        // Extragem JWT token din header
        String jwtToken = token.replace("Bearer ", "");
        // Parsează token-ul JWT
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(jwtToken)
                .getBody();

        // Obținem email-ul din token
        String email = claims.getSubject();

        // Găsim utilizatorul după email
        Utilizator utilizator = repositoryUtilizator.findByEmail(email);
        if (utilizator == null) {
            throw new RuntimeException("Utilizatorul nu a fost găsit");
        }

        // Obținem ID-ul utilizatorului
        Long idUtilizator = utilizator.getId();

        // Apelăm serviciul pentru a obține produsele din coșul utilizatorului
        return cosService.obtineCos(idUtilizator);
    }

    @PostMapping("/adauga")
    public ResponseEntity<String> adaugaInCos(@RequestHeader("Authorization") String token, @RequestParam Long idProdus, @RequestParam int cantitate) {
        // Extrage token-ul fără prefixul "Bearer "
        String tokenClean = token.substring(7);
        JwtUtil jwtUtil = new JwtUtil();
        Long idUtilizator = jwtUtil.extractIdUtilizator(tokenClean);

        if (idUtilizator == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilizator neautorizat");
        }

        cosService.adaugaInCos(idUtilizator, idProdus, cantitate);
        return ResponseEntity.ok("Produs adăugat în coș");
    }

    @DeleteMapping("/sterge/{productId}")
    public ResponseEntity<Void> stergeDinCos(@PathVariable Long productId) {
        try {
            cosService.stergeDinCos(productId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
