package com.sinhangman.gas.service;

import com.sinhangman.gas.model.Notice;
import com.sinhangman.gas.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {
    
    private final NoticeRepository noticeRepository;
    
    public List<Notice> findAll() {
        return noticeRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Notice findById(Long id) {
        return noticeRepository.findById(id).orElse(null);
    }
    
    public List<Notice> findImportantNotices() {
        return noticeRepository.findByIsImportantTrueOrderByCreatedAtDesc();
    }
    
    @Transactional
    public Notice save(Notice notice) {
        return noticeRepository.save(notice);
    }
    
    @Transactional
    public void incrementViewCount(Long id) {
        noticeRepository.incrementViewCount(id);
    }
    
    @Transactional
    public void delete(Long id) {
        noticeRepository.deleteById(id);
    }
}

