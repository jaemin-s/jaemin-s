# Clean Architecture Migration Plan

## Migration Steps

### 1단계 Feature 기반 구조

기능(페이지)단위로 디렉토리 분리.
Redux 기반 상태관리로 변경 : 현재 useState기반 상태관리 중이라서 페이지 전환시 상태 초기화됨

```
src/
├── features/
│   ├── auth/
│   │   ├── routes/
│   │   │   ├── AuthLayout.jsx    # 인증 관련 레이아웃
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   └── redux/
│   │       └── authSlice.js
│   └── products/
│       ├── routes/
│       │   ├── ProductLayout.jsx  # 상품 관련 레이아웃
│       │   ├── ProductListPage.jsx
│       │   └── ProductDetailPage.jsx
│       ├── ProductCard.jsx
│       ├── ProductFilter.jsx
│       └── redux/
├── shared/
│   ├── ui/
│   ├── layouts/
│   │   └── RootLayout.jsx        # 최상위 레이아웃
│   └── styles/
└── App.jsx
```

### 2. 서비스, 훅 분리

```
src/
├── features/
│   ├── auth/
│   │   ├── routes/
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useLoginForm.js
│   │   └── redux/
│   └── products/
│       ├── routes/
│       │   ├── ProductLayout.jsx
│       │   ├── ProductListPage.jsx
│       │   └── ProductDetailPage.jsx
│       ├── components/
│       ├── services/
│       ├── hooks/
│       └── redux/
├── shared/
│   ├── ui/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   │   └── apiClient.js
│   └── styles/
└── App.jsx
```

### 3. 클린 아키텍처

```
src/
├── core/
│   └── domain/
├── application/
│   └── useCases/
├── infrastructure/
│   ├── api/
│   └── store/
├── presentation/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── routes/          # 라우팅 관련
│   │   │   │   ├── AuthLayout.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── index.jsx    # 라우트 설정
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── styles/
│   │   └── products/
│   │       ├── routes/
│   │       │   ├── ProductLayout.jsx
│   │       │   ├── ProductListPage.jsx
│   │       │   ├── ProductDetailPage.jsx
│   │       │   └── index.jsx
│   │       ├── components/
│   │       └── hooks/
│   ├── shared/
│   │   ├── ui/
│   │   ├── layouts/
│   │   │   └── RootLayout.jsx
│   │   └── styles/
│   └── routes/                   # 루트 라우트 설정
│       └── index.jsx
└── App.jsx
```

### 4. 패턴 확립 및 문서화 (1-2주)

- 첫 기능 마이그레이션 경험 정리
- 팀 내 가이드라인 작성
- 다음 마이그레이션 대상 기능 선정

```plaintext
src/
├── core/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   └── Profile.ts
│   │   ├── repositories/
│   │   └── usecases/
│   └── application/
│       ├── services/
│       └── ports/
├── infrastructure/
│   ├── api/
│   ├── repositories/
│   └── services/
├── presentation/
│   ├── features/
│   │   └── profile/  # 완전히 새 구조로 이전 완료
│   ├── components/
│   └── hooks/
└── shared/
    ├── utils/
    └── types/
```

### 5. 반복 및 확장 (기능당 2-3주)

- 우선순위에 따라 다른 기능들 순차적 마이그레이션
- 팀원들과 함께 점진적으로 진행
- 각 단계마다 충분한 테스트와 검증

```plaintext
src/
├── core/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   ├── Profile.ts
│   │   │   ├── Content.ts
│   │   │   └── Player.ts
│   │   ├── repositories/
│   │   └── usecases/
│   │       ├── profile/
│   │       ├── auth/
│   │       └── player/
│   └── application/
│       ├── services/
│       └── ports/
├── infrastructure/
│   ├── api/
│   ├── repositories/
│   └── services/
├── presentation/
│   ├── features/
│   │   ├── profile/
│   │   ├── auth/
│   │   └── player/
│   ├── components/
│   └── hooks/
└── shared/
    ├── utils/
    ├── types/
    └── constants/
```

## 주의사항

1. 한 번에 모든 것을 바꾸려 하지 않기
2. 각 단계마다 충분한 테스트 커버리지 확보
3. 팀원들과 충분한 논의와 합의
4. 실제 사용자 영향도 고려
5. 롤백 계획 수립
