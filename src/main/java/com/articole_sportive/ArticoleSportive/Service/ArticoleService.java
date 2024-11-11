package com.articole_sportive.ArticoleSportive.Service;

import com.articole_sportive.ArticoleSportive.Entity.Articole;
import com.articole_sportive.ArticoleSportive.Repository.RepositoryArticole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ArticoleService {
    @Autowired
    private RepositoryArticole articole;
    public List<Articole> getAllArticole() {
        return  articole.findAll();
    }
}
