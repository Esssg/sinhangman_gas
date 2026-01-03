package com.sinhangman.gas.config;

import com.sinhangman.gas.model.Notice;
import com.sinhangman.gas.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final NoticeRepository noticeRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // 초기 공지사항 데이터 생성
        if (noticeRepository.count() == 0) {
            Notice notice1 = new Notice();
            notice1.setTitle("신항만 가스 홈페이지 오픈을 환영합니다!");
            notice1.setContent("안녕하세요. 신항만 가스입니다.\n\n저희 홈페이지를 방문해 주셔서 감사합니다.\n" +
                    "신항만 가스는 부산 사하구 지역에서 안전하고 신뢰할 수 있는 LPG 가스를 공급하고 있습니다.\n\n" +
                    "앞으로도 고객 여러분께 최상의 서비스를 제공하기 위해 노력하겠습니다.\n감사합니다.");
            notice1.setIsImportant(true);
            notice1.setCreatedAt(LocalDateTime.now());
            notice1.setUpdatedAt(LocalDateTime.now());
            notice1.setViewCount(0);
            noticeRepository.save(notice1);
            
            Notice notice2 = new Notice();
            notice2.setTitle("안전한 가스 사용 수칙 안내");
            notice2.setContent("가스를 안전하게 사용하시기 위한 주의사항입니다.\n\n" +
                    "1. 가스 사용 후 반드시 중간밸브를 잠그세요.\n" +
                    "2. 가스레인지 주변에 인화성 물질을 두지 마세요.\n" +
                    "3. 정기적으로 가스 호스 상태를 점검하세요.\n" +
                    "4. 가스 냄새가 나면 즉시 환기하고 연락주세요.\n\n" +
                    "문의: 010-5513-3481");
            notice2.setIsImportant(true);
            notice2.setCreatedAt(LocalDateTime.now().minusDays(1));
            notice2.setUpdatedAt(LocalDateTime.now().minusDays(1));
            notice2.setViewCount(0);
            noticeRepository.save(notice2);
            
            Notice notice3 = new Notice();
            notice3.setTitle("설 명절 배송 일정 안내");
            notice3.setContent("설 명절 기간 동안의 배송 일정을 안내드립니다.\n\n" +
                    "명절 당일은 휴무이며, 그 외 기간은 정상 영업합니다.\n" +
                    "긴급 상황 발생 시 비상연락망으로 연락 주시기 바랍니다.\n\n" +
                    "즐거운 명절 보내세요!");
            notice3.setIsImportant(false);
            notice3.setCreatedAt(LocalDateTime.now().minusDays(3));
            notice3.setUpdatedAt(LocalDateTime.now().minusDays(3));
            notice3.setViewCount(0);
            noticeRepository.save(notice3);
        }
    }
}

