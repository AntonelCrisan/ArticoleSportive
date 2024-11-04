package com.articole_sportive.ArticoleSportive;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ArticoleService {
    @Autowired
    private RepositoryArticole articole;
    public List<Articole> getAllArticole() {
        System.out.println("Articole din baza de date: " + articole.findAll().toString());
        return  articole.findAll();
    }
}
