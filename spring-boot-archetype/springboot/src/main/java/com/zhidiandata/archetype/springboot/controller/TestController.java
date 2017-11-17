package com.zhidiandata.archetype.springboot.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.constraints.NotNull;

public class TestController {
    @RequestMapping(value = "/test", produces = {"application/json"}, method = RequestMethod.GET)
    ResponseEntity<String> cameraAddPost(@NotNull @RequestParam("hello") String hello) {
        return new ResponseEntity<>("foo bar", HttpStatus.OK);
    }
}
