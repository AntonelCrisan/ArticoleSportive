package com.articole_sportive.ArticoleSportive.Entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import org.springframework.data.annotation.Id;

import java.nio.channels.FileChannel;
import java.util.Date;
@Entity
@Table(name="articole")
public class Articole {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imagine;
    private String nume;
    private String pret;
    private String categorie;
    private String subcategorie;
    private Integer cantitate;
    private String descriere;
    private Date datapublicarii;
    public Articole() {
        super();
    }
    public Articole(Long id, String imagine, String nume, String pret, String categorie, String subcategorie, Integer cantitate, String descriere, Date datapublicarii) {
        this.id = id;
        this.imagine = imagine;
        this.nume = nume;
        this.pret = pret;
        this.categorie = categorie;
        this.subcategorie = subcategorie;
        this.cantitate = cantitate;
        this.descriere = descriere;
        this.datapublicarii = datapublicarii;
    }
    public String getImagine() {
        return imagine;
    }

    public void setImagine(String imagine) {
        this.imagine = imagine;
    }
    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getPret() {
        return pret;
    }

    public void setPret(String pret) {
        this.pret = pret;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getSubcategorie() {
        return subcategorie;
    }

    public void setSubcategorie(String subcategorie) {
        this.subcategorie = subcategorie;
    }

    public Integer getCantitate() {
        return cantitate;
    }

    public void setCantitate(Integer cantitate) {
        this.cantitate = cantitate;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public Date getDatapublicarii() {
        return datapublicarii;
    }

    public void setDatapublicarii(Date datapublicarii) {
        this.datapublicarii = datapublicarii;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
