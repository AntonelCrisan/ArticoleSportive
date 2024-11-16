package com.articole_sportive.ArticoleSportive.Repository;

import com.articole_sportive.ArticoleSportive.Entity.Articole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositoryArticole extends JpaRepository<Articole, Long> {
    Optional<Articole> findByNumeAndId(String nume, Long id);
}
