package com.articole_sportive.ArticoleSportive.Repository;

import com.articole_sportive.ArticoleSportive.Entity.Articole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryArticole extends JpaRepository<Articole, Long> {
}
