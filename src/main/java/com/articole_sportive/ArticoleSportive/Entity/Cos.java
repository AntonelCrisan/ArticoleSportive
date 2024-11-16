package com.articole_sportive.ArticoleSportive.Entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "cos")
public class Cos {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_utilizator")
    private Utilizator utilizator;
    @ManyToOne
    @JoinColumn(name = "id_produs")
    private Articole articole;
    private int cantitate;
    public Cos(Long id, Utilizator utilizator, Articole articole, int cantitate) {
        this.id = id;
        this.utilizator = utilizator;
        this.articole = articole;
        this.cantitate = cantitate;
    }

    public Cos() {
        super();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Utilizator getUtilizator() {
        return utilizator;
    }

    public void setUtilizator(Utilizator utilizator) {
        this.utilizator = utilizator;
    }

    public Articole getArticole() {
        return articole;
    }

    public void setArticole(Articole articole) {
        this.articole = articole;
    }

    public int getCantitate() {
        return cantitate;
    }

    public void setCantitate(int cantitate) {
        this.cantitate = cantitate;
    }
}
