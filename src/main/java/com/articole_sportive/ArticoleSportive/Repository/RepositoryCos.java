package com.articole_sportive.ArticoleSportive.Repository;

import com.articole_sportive.ArticoleSportive.Entity.Articole;
import com.articole_sportive.ArticoleSportive.Entity.Cos;
import com.articole_sportive.ArticoleSportive.Entity.Utilizator;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface RepositoryCos extends JpaRepository<Cos, Long> {
    List<Cos> findByUtilizator_Id(Long idUtilizator);
    Cos findByUtilizatorAndArticole(Utilizator utilizator, Articole articole);
}
