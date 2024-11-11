package com.articole_sportive.ArticoleSportive.Repository;

import com.articole_sportive.ArticoleSportive.Entity.Utilizator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepositoryUtilizator extends JpaRepository<Utilizator, Integer> {
    Optional<Utilizator> findByEmail(String email);
}
