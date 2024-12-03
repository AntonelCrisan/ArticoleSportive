package com.articole_sportive.ArticoleSportive.Controler;

import com.articole_sportive.ArticoleSportive.Entity.Articole;
import com.articole_sportive.ArticoleSportive.Service.ArticoleService;
import com.articole_sportive.ArticoleSportive.Service.CosService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private CosService cosService;

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
    @PutMapping("actualizareProdus/{id}")
    public ResponseEntity<Optional<Articole>> updateProdus(@PathVariable Long id, @RequestBody Articole produsActualizat) {
        Optional <Articole> articole = articoleService.updateArticole(id, produsActualizat);
        return ResponseEntity.ok(articole);
    }
    @DeleteMapping("/stergeProdus/{id}")
    public ResponseEntity<Void> stergeProdus(@PathVariable Long id) {
        cosService.stergeProdus(id);
        articoleService.stergeArticol(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/adauga")
    public ResponseEntity<Articole> adaugaArticol(@RequestBody Articole articol) {
        Articole articolSalvat = articoleService.adaugaArticol(articol);
        return ResponseEntity.ok(articolSalvat);
    }
}
