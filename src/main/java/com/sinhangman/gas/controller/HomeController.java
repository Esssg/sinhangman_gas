package com.sinhangman.gas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("companyName", "신항만 가스");
        model.addAttribute("phone", "010-5513-3481");
        model.addAttribute("address", "부산 사하구 을숙도대로677번길 11");
        model.addAttribute("businessHours", "평일 07:30 - 17:30, 토요일 07:30 - 13:00");
        return "index";
    }
    
    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("companyName", "신항만 가스");
        return "about";
    }
    
    @GetMapping("/products")
    public String products(Model model) {
        return "products";
    }
    
    @GetMapping("/safety")
    public String safety(Model model) {
        return "safety";
    }
    
    @GetMapping("/location")
    public String location(Model model) {
        model.addAttribute("address", "부산 사하구 을숙도대로677번길 11");
        model.addAttribute("phone", "010-5513-3481");
        return "location";
    }
}

