# TypeScript

JavaScript를 기반으로 확장된 언어.
정적으로 타입을 지정하여 실행하지 않고 에러를 차단할 수 있음.
컴파일을 하면 JavaScript로 변환하면서 타입 에러를 검출.

## Basic

- Primitives: number, string, boolean
- More complex types: arrays, objects
- Function types, parameters

```
let age: number;
let age: Number; // (x) 대문자로 쓰면 JavaScript의 Number 객체를 지정하게됨
let userName: string;

// More complex types

let hobbies: string[];

hobbies = ['Sports', 'Cooking'];

/*
let person: {
  name: string;
  age: number;
};

person = {
  name: 'Max',
  age: 32
};
*/

type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: 'Max',
  age: 32
};

let people: {
  name: string;
  age: number;
}[];

// Type inference

let course: string | number = 'React - The Complete Guide';

course = 12341;

// Functions & types

function add(a: number, b: number) {
  return a + b;
}

function print(value: any) {
  console.log(value);
}

// Generics

function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd')
```

## Component

### props

```
import React from 'react';

//React.FC로 지정하면 children을 항상 포함
const Todos: React.FC<{ items: string[] }> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default Todos;
```
