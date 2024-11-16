package com.articole_sportive.ArticoleSportive.Controler;

import com.articole_sportive.ArticoleSportive.Entity.Articole;
import com.articole_sportive.ArticoleSportive.Service.ArticoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/")
public class ArticoleControler {
    @Autowired
    private ArticoleService articoleService;
    @GetMapping("/")
    public List<Articole> afisareArticole() {
        return articoleService.getAllArticole();
    }
    @GetMapping("/detaliiProdus/{nume}/{id}")
    public ResponseEntity<Articole> detaliiProdus(@PathVariable String nume, @PathVariable Long id) {
        Optional<Articole> articol = articoleService.getArticoleByNameAndId(nume, id);
        return articol.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
