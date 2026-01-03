package com.sinhangman.gas.repository;

import com.sinhangman.gas.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    
    // 최신순으로 정렬
    List<Notice> findAllByOrderByCreatedAtDesc();
    
    // 중요 공지사항 조회
    List<Notice> findByIsImportantTrueOrderByCreatedAtDesc();
    
    // 조회수 증가
    @Modifying
    @Query("UPDATE Notice n SET n.viewCount = n.viewCount + 1 WHERE n.id = :id")
    void incrementViewCount(@Param("id") Long id);
}

