package com.sinhangman.gas.controller;

import com.sinhangman.gas.model.Notice;
import com.sinhangman.gas.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/notices")
@RequiredArgsConstructor
public class NoticeController {
    
    private final NoticeService noticeService;
    
    @GetMapping
    public String list(Model model) {
        List<Notice> notices = noticeService.findAll();
        model.addAttribute("notices", notices);
        return "notices/list";
    }
    
    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        Notice notice = noticeService.findById(id);
        if (notice != null) {
            noticeService.incrementViewCount(id);
            model.addAttribute("notice", notice);
            return "notices/detail";
        }
        return "redirect:/notices";
    }
}

