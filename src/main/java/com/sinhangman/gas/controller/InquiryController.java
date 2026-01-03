package com.sinhangman.gas.controller;

import com.sinhangman.gas.model.Inquiry;
import com.sinhangman.gas.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/inquiry")
@RequiredArgsConstructor
public class InquiryController {
    
    private final InquiryService inquiryService;
    
    @GetMapping
    public String inquiryForm(Model model) {
        model.addAttribute("inquiry", new Inquiry());
        return "inquiry";
    }
    
    @PostMapping
    public String submitInquiry(@Valid @ModelAttribute Inquiry inquiry, 
                                BindingResult result,
                                RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "inquiry";
        }
        
        inquiryService.save(inquiry);
        redirectAttributes.addFlashAttribute("message", "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
        return "redirect:/inquiry/success";
    }
    
    @GetMapping("/success")
    public String inquirySuccess() {
        return "inquiry-success";
    }
}

