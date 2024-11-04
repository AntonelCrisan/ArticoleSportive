package com.articole_sportive.ArticoleSportive;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class ArticoleControler {
    @Autowired
    private ArticoleService articoleService;
    @GetMapping
    public ResponseEntity<List<Articole>> produse() {
        return new ResponseEntity<List<Articole>>(articoleService.getAllArticole(), HttpStatus.OK);
    }
}
