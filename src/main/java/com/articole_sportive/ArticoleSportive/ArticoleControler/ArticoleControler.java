package com.articole_sportive.ArticoleSportive.ArticoleControler;

import com.articole_sportive.ArticoleSportive.Entity.Articole;
import com.articole_sportive.ArticoleSportive.Service.ArticoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ArticoleControler {
    @Autowired
    private ArticoleService articoleService;
    @GetMapping("/")
    public List<Articole> afisareArticole() {
        return articoleService.getAllArticole();
    }
}
