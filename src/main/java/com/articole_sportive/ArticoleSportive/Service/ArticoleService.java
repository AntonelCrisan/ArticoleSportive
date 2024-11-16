package com.articole_sportive.ArticoleSportive.Service;

import com.articole_sportive.ArticoleSportive.Entity.Articole;
import com.articole_sportive.ArticoleSportive.Repository.RepositoryArticole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticoleService {
    @Autowired
    private RepositoryArticole articole;
    public List<Articole> getAllArticole() {
        return  articole.findAll();
    }
    public Optional<Articole> getArticoleById(Long id) {
        return articole.findById(id);
    }
    public Optional<Articole> getArticoleByNameAndId(String name, Long id) {
        return articole.findByNumeAndId(name, id);
    }
}
