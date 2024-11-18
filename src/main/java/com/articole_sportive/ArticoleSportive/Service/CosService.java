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

    @Autowired
    public CosService(RepositoryCos repositoryCos, RepositoryUtilizator repositoryUtilizator, RepositoryArticole repositoryArticole) {
        this.repositoryCos = repositoryCos;
        this.repositoryUtilizator = repositoryUtilizator;
        this.repositoryArticole = repositoryArticole;
    }
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

    public void adaugaInCos(Long idUtilizator, Long idProdus, int cantitate) {
        // Găsește utilizatorul și produsul
        Utilizator utilizator = repositoryUtilizator.findById(idUtilizator).orElse(null);
        Articole produs = repositoryArticole.findById(idProdus).orElse(null);

        if (utilizator == null || produs == null) {
            throw new RuntimeException("Utilizatorul sau produsul nu există.");
        }

        // Verifică dacă produsul există deja în coșul utilizatorului
        Cos cosExistent = repositoryCos.findByUtilizatorAndArticole(utilizator, produs);

        if (cosExistent != null) {
            // Dacă produsul există, actualizează cantitatea
            cosExistent.setCantitate(cosExistent.getCantitate() + cantitate);
            repositoryCos.save(cosExistent);
        } else {
            // Dacă produsul nu există, adaugă un entry nou
            Cos cosNou = new Cos();
            cosNou.setUtilizator(utilizator);
            cosNou.setArticole(produs);
            cosNou.setCantitate(cantitate);
            repositoryCos.save(cosNou);
        }
    }
    public void actualizeazaCos(Cos cos) {
        repositoryCos.save(cos);
    }
    public Cos gasesteCosById(Long idCos) {
        return repositoryCos.findById(idCos).orElse(null);
    }
    public void stergeDinCos(Long idCos) {
        repositoryCos.deleteById(idCos);
    }
}