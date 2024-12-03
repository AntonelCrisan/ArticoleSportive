package com.articole_sportive.ArticoleSportive.Service;

import com.articole_sportive.ArticoleSportive.Entity.Articole;
import com.articole_sportive.ArticoleSportive.Repository.RepositoryArticole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
    public Optional<Articole> updateArticole(Long id, Articole articol) {
        return articole.findById(id)
                .map(produs -> {
                    if(articol.getImagine() != null){
                        produs.setImagine(articol.getImagine());
                    }
                    if(articol.getNume() != null){
                        produs.setNume(articol.getNume());
                    }
                    if(articol.getPret() != null){
                        produs.setPret(articol.getPret());
                    }
                    if(articol.getCategorie() != null){
                        produs.setCategorie(articol.getCategorie());
                    }
                    if(articol.getSubcategorie() != null){
                        produs.setSubcategorie(articol.getSubcategorie());
                    }
                    if(articol.getCantitate() != null){
                        produs.setCantitate(articol.getCantitate());
                    }
                    if(articol.getDescriere() != null){
                        produs.setDescriere(new String(articol.getDescriere()));
                    }
                    return articole.save(produs);
                });
    }
    public void stergeArticol(Long id) {
        articole.deleteById(id);
    }

    public Articole adaugaArticol(Articole articol) {
        articol.setDatapublicarii(new Date()); // Setează data publicării automat
        return articole.save(articol);
    }
}
