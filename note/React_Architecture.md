# Architecture

### 작은 프로젝트

```
src/
├── core/                       # 핵심 비즈니스 로직
│   ├── domain/                 # 도메인 모델
│   │   ├── entities/          # 비즈니스 엔티티
│   │   │   └── Product.ts     # 상품 타입 정의
│   │   └── repositories/      # 리포지토리 인터페이스
│   │       └── IProductRepository.ts
│   └── usecases/              # 비즈니스 유즈케이스
│       └── product/
│           └── GetProductsUseCase.ts
│
├── infrastructure/            # 외부 의존성 및 구현
│   ├── data/                 # 하드코딩된 데이터
│   │   └── productData.ts    # 상품 목록 데이터
│   └── repositories/         # 리포지토리 구현
│       └── ProductRepository.ts
│
├── presentation/             # UI 레이어
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── common/         # 공통 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   └── product/        # 상품 관련 컴포넌트
│   │       ├── ProductCard.tsx
│   │       └── ProductList.tsx
│   ├── hooks/              # 커스텀 훅
│   │   └── useProducts.ts
│   └── pages/              # 페이지 컴포넌트
│       └── ProductListPage.tsx
│
└── shared/                  # 공통 유틸리티
    ├── types/              # 공통 타입 정의
    │   └── index.ts
    └── utils/              # 유틸리티 함수
        ├── formatters.ts   # 가격, 날짜 등 포맷팅
        └── validators.ts   # 유효성 검사


```

API 호출이 늘어나면 `infrastructure/api/` 디렉토리 추가

상태 관리가 복잡해지면 `presentation/store/` 추가

테스트가 필요하면 각 디렉토리에 `tests/` 폴더 추가
