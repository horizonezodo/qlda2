package com.example.qlud.control;

import com.example.qlud.model.LogData;
import com.example.qlud.repo.LogDataRepo;
import com.example.qlud.response.MessageResponse;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/app")
public class LogController {

    @Autowired
    private LogDataRepo repo;

    @GetMapping("/all-log")
    public ResponseEntity<?> getAllLog(){
        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/log/{id}")
    public ResponseEntity<?> getLogById(@PathVariable("id")String id){
        Optional<LogData> opt = repo.findById(id);
        if(opt.isPresent()){
            return new ResponseEntity<>(opt.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new MessageResponse("Cannot find this id: " + id), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/search-log")
    public ResponseEntity<?> searchLog(@RequestParam("key")String key){
            return new ResponseEntity<>(repo.findByKey(key), HttpStatus.OK);
    }
}
