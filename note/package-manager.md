# Package manager (npm, yarn)

-   Node.js의 패키지 매니저
-   CLI를 통해 패키지 설치 및 삭제, 버전관리와 의존성 관리

## npm

1. Node.js의 기본 패키지 매니저
2. 온라인 플랫폼

### 설치

node와 함께 자동으로 설치

## yarn

1. Facebook에서 npm의 단점을 보완하기 위해 만듬
2. yarn.lock 파일을 통해 더 엄격한 의존성 관리

### 설치

```
npm install yarn --global
```

mac은 brew를 통해 설치도 가능

```
brew update
brew install yarn
```

## npm과 yarn의 차이점

### 속도

npm : 패키지를 하나씩 순차적으로 설치.

yarn : 여러 패키지를 동시에 가져오고 설치하여 속도가 더 빠름

### 보안

npm : 자동으로 패키지에 포함된 다른 패키지 코드 실행. (보안 취약점 야기)

yarn : yarn.lock 또는 package.json파일에 있는 파일만을 설치
