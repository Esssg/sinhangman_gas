package com.sinhangman.gas.repository;

import com.sinhangman.gas.model.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    
    // 답변 상태별 조회
    List<Inquiry> findByIsAnswered(Boolean isAnswered);
    
    // 최신순 조회
    List<Inquiry> findAllByOrderByCreatedAtDesc();
}

