package com.articole_sportive.ArticoleSportive.Service;

import com.articole_sportive.ArticoleSportive.DTO.CosDTO;
import com.articole_sportive.ArticoleSportive.Entity.Articole;
import com.articole_sportive.ArticoleSportive.Entity.Cos;
import com.articole_sportive.ArticoleSportive.Entity.Utilizator;
import com.articole_sportive.ArticoleSportive.Repository.RepositoryArticole;
import com.articole_sportive.ArticoleSportive.Repository.RepositoryCos;
import com.articole_sportive.ArticoleSportive.Repository.RepositoryUtilizator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CosService {

    @Autowired
    private RepositoryCos repositoryCos;

    @Autowired
    private RepositoryUtilizator repositoryUtilizator;

    @Autowired
    private RepositoryArticole repositoryArticole;

    public List<CosDTO> obtineCos(Long idUtilizator) {
        List<Cos> cos = repositoryCos.findByUtilizator_Id(idUtilizator);

        // Conversia din Cos în CosDTO
        List<CosDTO> cosDTOs = new ArrayList<>();
        for (Cos c : cos) {
            Articole produs = c.getArticole();
            cosDTOs.add(new CosDTO(c.getId(), produs.getId(), produs.getNume(), produs.getDescriere(), produs.getImagine(), produs.getPret(), c.getCantitate()));
        }
        return cosDTOs;
    }

    public Cos adaugaInCos(Long idUtilizator, Long idProdus, int cantitate) {
        Utilizator utilizator = repositoryUtilizator.findById(idUtilizator).orElse(null);
        Articole produs = repositoryArticole.findById(idProdus).orElse(null);

        if (utilizator != null && produs != null) {
            Cos cos = new Cos();
            cos.setUtilizator(utilizator);
            cos.setArticole(produs);
            cos.setCantitate(cantitate);
            return repositoryCos.save(cos);
        }
        return null;
    }

    public void stergeDinCos(Long idCos) {
        repositoryCos.deleteById(idCos);
    }
}