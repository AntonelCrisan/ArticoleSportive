package com.articole_sportive.ArticoleSportive.UtilizatorControler;

import com.articole_sportive.ArticoleSportive.Entity.Utilizator;
import com.articole_sportive.ArticoleSportive.Service.UtilizatorService;
import com.articole_sportive.ArticoleSportive.Util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
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
         // Dacă eroarea este legată de email-ul deja folosit
         if (e.getMessage().equals("Email-ul este deja folosit.")) {
             return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
         }
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Eroare la înregistrare.");
     }
 }
    @PostMapping("/autentificare")
    public ResponseEntity<String> autentificare(@RequestBody Utilizator utilizator, HttpServletResponse response) {
        Utilizator userExistent = utilizatorService.findByEmail(utilizator.getEmail());
        if (userExistent == null || !passwordEncoder.matches(utilizator.getParola(), userExistent.getParola())) {
            return ResponseEntity.status(401).body("Email sau parolă incorectă");
        }

        String token = jwtUtil.generateToken(userExistent.getEmail());
        // Crearea unui cookie cu JWT
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(86400);

        response.addCookie(cookie); // Adaugă cookie-ul în răspuns
        return ResponseEntity.ok(token);
    }
}
