package com.articole_sportive.ArticoleSportive.Resolver;

import com.articole_sportive.ArticoleSportive.Entity.Utilizator;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

@Component
public class UtilizatorResolver implements GraphQLQueryResolver {

    public Utilizator profilUtilizator(Long id) {
        // Exemplu simplu - datele pot veni din baza de date
        return new Utilizator(id, "Ion Popescu", "ion.popescu@example.com", "", "ADMIN");
    }
}