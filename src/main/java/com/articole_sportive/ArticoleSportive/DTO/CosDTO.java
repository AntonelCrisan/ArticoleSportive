package com.articole_sportive.ArticoleSportive.DTO;

public class CosDTO {
    private Long id;
    private Long idProdus;
    private String nume;
    private String descriere;
    private String imagine;
    private String pret;
    private int cantitate;

    public CosDTO(Long id, Long idProdus, String nume, String descriere, String imagine, String pret, int cantitate) {
        this.id = id;
        this.idProdus = idProdus;
        this.nume = nume;
        this.descriere = descriere;
        this.imagine = imagine;
        this.pret = pret;
        this.cantitate = cantitate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdProdus() {
        return idProdus;
    }

    public void setIdProdus(Long idProdus) {
        this.idProdus = idProdus;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getImagine() {
        return imagine;
    }

    public void setImagine(String imagine) {
        this.imagine = imagine;
    }

    public String getPret() {
        return pret;
    }

    public void setPret(String pret) {
        this.pret = pret;
    }

    public int getCantitate() {
        return cantitate;
    }

    public void setCantitate(int cantitate) {
        this.cantitate = cantitate;
    }
}
