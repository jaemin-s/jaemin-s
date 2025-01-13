# Testing

## Why

- 수동 테스트로는 모든 경우에 대해 테스트 하기 어려움
- 코드가 수정될 때 마다 일부 또는 전체 테스트를 자동으로 하여 오류를 미리 발견할 수 있음

## Unit Tests

- 독립적인 단위의 테스트

## Integration Tests

- 다른 컴포넌트와 조합된 통합 테스트

## End-to-End Tests

- 사용자 입장에서 시나리오대로 전체 테스트

## Tools

### jest

테스팅 코드를 실행하고 결과를 확인

### React-Testing-Library

리액트 앱에서 컴포넌트를 렌더링하고 시뮬레이팅

## How

### Basic

1. .test.js로 끝나는 파일을 생성
2. 첫번째 인자로는 테스트 내용, 두번째 인자로는 실제 테스트 내용이 들어있는 화살표 함수를 담아서 test함수 작성
   1. Arrange : 테스트 '준비'
   2. Act : 테스트를 '실행'
   3. Assert : 결과를 '단언'하여 예상과 같은지 확인
3. terminal에서 npm test 실행
4. 알맞은 선택지 선택 ( 전체 테스트는 'a')

```
// Greeting.test.js
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('renders Hello World as a text', () => {
  // Arrange
  render(<Greeting />);

  // Act
  // ... nothing

  // Assert
  const helloWorldElement = screen.getByText('Hello World!');
  expect(helloWorldElement).toBeInTheDocument();
});
```

### test suites

테스트 그룹화

1. describe를 사용. 첫번째 인자는 테스트 그룹의 이름, 두번째 인자로는 실제 테스트
2. describe가 없는 test는 자동으로 독립적인 describe를 가짐

```
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText('Hello World!');
    expect(helloWorldElement).toBeInTheDocument();
  });
});
```

### testing-user-interaction-and-state

```
import { useState } from 'react';

const Greeting = () => {
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h2>Hello World!</h2>
      {!changedText && <p>It's good to see you!</p>}
      {changedText && <p>Changed!</p>}
      <button onClick={changeTextHandler}>Change Text!</button>
    </div>
  );
};

export default Greeting;
```

```
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting component', () => {
  test('renders "Hello World" as a text', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText('Hello World!');
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders "good to see" you if the button was NOT clicked', () => {
    render(<Greeting />);

    const outputElement = screen.getByText('good to see you', { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test('renders "Changed!" if the button was clicked', () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement)

    // Assert
    const outputElement = screen.getByText('Changed!');
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "good to see you" if the button was clicked', () => {
     // Arrange
     render(<Greeting />);

     // Act
     const buttonElement = screen.getByRole('button');
     userEvent.click(buttonElement)

     // Assert
     const outputElement = screen.queryByText('good to see you', { exact: false });
     expect(outputElement).toBeNull();
  });
});
```

### async test

```
import { useEffect, useState } from 'react';

const Async = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Async;
```

```
import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    render(<Async />)

    //get과 find의 차이는 find는 Promise를 반환
    //세번째 인자로 timeout 시간을 전달 가능. 기본값 1000(ms)
    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});
```

하지만 http 통신이나 localstorage를 수정하는 동작은 테스트에서 실제로 실행되면 안되므로 mockData를 활용

```
import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});
```

### 추가 문서

Jest 공식 문서
https://jestjs.io/docs/getting-started
React-Testing-Library 공식 문서
https://testing-library.com/docs/react-testing-library/intro/
