package com.example.qlud.control;

import com.example.qlud.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AppController {

    @Autowired
    ProductRepo repo;

    @GetMapping("/")
    public String landingPage(Model model) {
        return "index";
    }

    @RequestMapping("/partials/{page}")
    String partialHandler(@PathVariable("page") final String page) {
        return page;
    }
}
