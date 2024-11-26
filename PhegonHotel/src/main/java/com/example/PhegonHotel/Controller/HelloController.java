package com.example.PhegonHotel.Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HelloController {
    @GetMapping("hello")
    public String greet(HttpServletRequest httpServletRequest){
        return "hello";
    }

    @GetMapping("about")
    public String about(HttpServletRequest httpServletRequest){
        return "example "+ httpServletRequest.getSession().getId();
    }
}
