package com.articole_sportive.ArticoleSportive;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositoryArticole  extends MongoRepository<Articole, String> {
}
