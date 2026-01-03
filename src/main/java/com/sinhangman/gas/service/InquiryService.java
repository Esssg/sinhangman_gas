package com.sinhangman.gas.service;

import com.sinhangman.gas.model.Inquiry;
import com.sinhangman.gas.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InquiryService {
    
    private final InquiryRepository inquiryRepository;
    
    public List<Inquiry> findAll() {
        return inquiryRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Inquiry findById(Long id) {
        return inquiryRepository.findById(id).orElse(null);
    }
    
    public List<Inquiry> findUnanswered() {
        return inquiryRepository.findByIsAnswered(false);
    }
    
    @Transactional
    public Inquiry save(Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }
    
    @Transactional
    public void delete(Long id) {
        inquiryRepository.deleteById(id);
    }
}

