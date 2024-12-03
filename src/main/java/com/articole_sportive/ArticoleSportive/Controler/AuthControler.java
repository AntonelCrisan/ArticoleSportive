package com.articole_sportive.ArticoleSportive.Controler;

import com.articole_sportive.ArticoleSportive.Entity.Utilizator;
import com.articole_sportive.ArticoleSportive.Service.UtilizatorService;
import com.articole_sportive.ArticoleSportive.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/")
public class AuthControler {
 @Autowired
 private UtilizatorService utilizatorService;
 @Autowired
 private JwtUtil jwtUtil;
 @Autowired
 private PasswordEncoder passwordEncoder;
 @PostMapping("/inregistrare")
    public ResponseEntity<String> inregistrare(@RequestBody Utilizator utilizator) {
     try{
         utilizatorService.inregistrareUtilizator(utilizator);
         return ResponseEntity.ok("Inregistrare reusita");
     }catch (Exception e){
         if (e.getMessage().equals("Email-ul este deja folosit.")) {
             return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
         }
         e.printStackTrace();
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Eroare la înregistrare.");
     }
 }
    @PostMapping("/autentificare")
    public ResponseEntity<String> autentificare(@RequestBody Utilizator utilizator) {
        Utilizator userExistent = utilizatorService.findByEmail(utilizator.getEmail());
        if (userExistent == null || !passwordEncoder.matches(utilizator.getParola(), userExistent.getParola())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email sau parolă incorectă");
        }
        String token = jwtUtil.generateToken(userExistent.getEmail(), userExistent.getId(), userExistent.getRol());
        System.out.println("Token" + token);
        return ResponseEntity.ok(token);
    }
    @GetMapping("/profil")
    public ResponseEntity<Utilizator> getUserDetails(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractUsername(token);
                Utilizator utilizator = utilizatorService.findByEmail(email);
                if (utilizator != null) {
                    return ResponseEntity.ok(utilizator);
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
