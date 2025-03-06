# Javascript Coding Test

## 목차

-   [최대공약수](#-최대공약수)

### 최대공약수

재귀함수를 이용하여 최대공약수 계산

```
const getGCD = (a,b) => a%b === 0 ? b : getGCD(b,a%b)
const gcd = getGCD(3,6) // 3
```
