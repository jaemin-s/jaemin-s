```mermaid
flowchart TD
    subgraph 가공
        e1{편집 소요}
        e2[EDIUS: 추가 영상 편집]
        subgraph TITAN
            direction TB
            ea1[FTP INPUT 경로에 원본 소재 배치]
            eaa{인코딩 형식 분류}
            ea2[VOD 인코딩]
            ea3[Nscreen 인코딩]
            ea4[광고 인코딩]
            ea5[FTP OUTPUT 경로에 배치]
            ea1 --> eaa
            eaa --> |192.168.15.48|ea2
            eaa --> |192.168.245.180|ea3
            eaa --> |192.168.15.157|ea4
            ea2 --> |mpg|ea5
            ea4 --> |mpg|ea5
            ea3 --> |mp4|ea5
        end
        e3[Express: 지상파 등 익당일 컨텐츠 전용]
    e1 --> |연령 고지 등 편집 필요|e2
    e2 --> TITAN
    e1 --> |편집 필요 없음|TITAN
    end
    subgraph 등록
        b1[CIMS에 등록?]
    end
    등록 --> 메타
    subgraph 메타
        c1[메타 등록?]
    end
    subgraph 편성
        d1[카테고리 편성]
    end
    subgraph 입수
        a1[CP와 담당자간 계약]
        a2[수급 확인]
        a3[입고 여부 및 경로 작성]
        a1 --> |CP별 지정된 FTP서버에 업로드
        sharepoint에서 주소 관리중| a2
        a2 --> |CIMS: 계약관리 -> 원본소재 입고관리|a3

    end
    입수 --> 등록
    메타 --> 편성
    편성 --> e1
    ea5 --> f0
    subgraph QC
        f0{QC 구분}
        f1[전수 QC: TV로 전체 영상 이상 유무 확인]
        f2[부분 QC: 플레이어로 구간 별 이상 유무 확인]
        f5{이상 유무 확인}
        f6[재 가공]
        f4[Sending Storage에 저장]
        f7{Nscreen?}
        f8[Mobile Storage에 저장
        코드크래프트에서 가져감]
        f0 --> |예약구매
        극장동시
        TV최초개봉
        프리미엄1,2
        이벤트영상|f1
        f0 --> |그 외 콘텐츠|f2
        f1 --> f5
        f2 --> f5
        f5 --> |특이사항 발견|f6
        f5 --> |이상 없음|f7
        f7 --> |yes|f8
        f7 --> |no|f4
    end
    f4 --> 전송
    subgraph 전송
        subgraph CIMS전송관리
            ga1[SO별 방영 시작일 설정]
        end
        subgraph 수동전송
        end
        subgraph 자동전송
        end
        g1[pitcher server]
        g2[poster server]
        subgraph catcher
        end
        g3[서비스]
        g4{에러 확인}
        g5[에러 타입별 조치]
        g6[LLT]
        g7[TAPE]
        CIMS전송관리 --> |지상파
        종편
        CJE&M
        기타 주요타이틀|수동전송
        CIMS전송관리 --> |그 외
        서비스일자 +3일|자동전송
        수동전송 --> g1
        자동전송 --> g1
        g2 --> |포스터 매핑|g1
        g1 --> |각 SO별 전송|catcher
        catcher -->  g4
        g4 --> |NO|g3
        g4 --> |YES|g5
        g3 --> |용량 부족|g6
        g6 --> |라이센스 만료 3개월 후|g7
    end

```

## 입수

입수 단계에서 할 일 : FTP 확인하여 CIMS '원본소재 입고관리'에 체크하면 끝?

입고 예정 리스트는 어디서 확인?

입고 예정인 콘텐츠가 FTP에 없으면? 누구에게 문의?

-   FTP 관리 쉐어포인트 : https://hchoice.sharepoint.com/:x:/g/media/EfotpDdXZNZGreAw8azqgYABtUwg4YR4gztkZwnxX0M-eQ?rtime=rSZc3ahU3Ug

## 등록, 메타, 편성 (콘사 작업 영역)

포스터, 메타의 출처?

각 단계별 파일 누락 및 오류 시 누구에게 문의?

각 파일의 상세 경로?

## 가공

가공 단계에서 할 일 : EDIUS 편집, INPUT 경로에 원본 소재 배치, 인코딩 결과물 OUTPUT 경로에 배치, 파일명 변경

EDIUS 편집 필요 기준?

EDIUS 편집은 수동 or 자동?

인코딩 과정에서 오류 시 처리?

동시 작업 가능 수

-   8대 가동중
-   1대당 2개씩 작업

가공 완료된 영상은 수동으로 파일명 변경해야함

익당일 콘텐츠(express)의 입고 여부 확인 방법? 없을 땐 어디에 문의?

TITAN 원격 접속(Anydesk) : Administrator // dnsdudtlf15^ (운영실15^)

## QC

QC 단계에서 할 일 : 영상 검수하여 CIMS에서 체크하면 끝?

검수 사항: 오디오 싱크, 화면 깨짐, 음모 노출, 오디오 이슈, 메타 줄거리와 영상 내용

코드크래프트에서 영상을 가져갔는지 여부? 가져간 이후 파일 처리?

## 전송

전송 단계에서 할 일 : 자동 전송 결과 확인(에러 시 조치), 수동 전송

각 에러 시 조치 방법?

자동 전송 대상 콘텐츠를 수동으로 전송하고 싶으면? +할 경우가 생기는지?

포스터 및 메타가 없으면?(매핑에 실패하면)

-   관제 서버 접속(Microsoft Remote Desktop) : 192.168.20.240 // administrator // dksckd3!&

-   AS 게시판 링크 : https://cs.cablevod.co.kr/
-   AS 게시판 계정 :
