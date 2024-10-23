package com.example.qlud.repo;

import com.example.qlud.model.LogData;
import com.example.qlud.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogDataRepo extends MongoRepository<LogData, String> {
    @Query("{ $or: [ " +
            "{ 'url': { $regex: ?0, $options: 'i' } }, " +
            "{ 'request': { $regex: ?0, $options: 'i' } }, " +
            "{ 'response': { $regex: ?0, $options: 'i' } }, " +
            "{ 'method': { $regex: ?0, $options: 'i' } }, " +
            "] }")
    List<LogData> findByKey(String key);
}
