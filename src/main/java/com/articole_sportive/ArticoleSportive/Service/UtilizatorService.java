package com.articole_sportive.ArticoleSportive.Service;

import com.articole_sportive.ArticoleSportive.Entity.Utilizator;
import com.articole_sportive.ArticoleSportive.Repository.RepositoryUtilizator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UtilizatorService {
    @Autowired
    private RepositoryUtilizator repositoryUtilizator;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    public void inregistrareUtilizator(Utilizator utilizator) throws Exception {
        // Verifică dacă email-ul este deja folosit
        Optional<Utilizator> utilizatorExistent = repositoryUtilizator.findByEmail(utilizator.getEmail());
        if (utilizatorExistent.isPresent()) {
            throw new Exception("Email-ul este deja folosit.");
        }
        utilizator.setParola(bCryptPasswordEncoder.encode(utilizator.getParola()));
        repositoryUtilizator.save(utilizator);
    }
    public Utilizator findByEmail(String email) {
        return repositoryUtilizator.findByEmail(email).orElse(null);
    }
}
