# React 기초

## Root Modal

1. DOM 계층 구조의 독립성
2. 이벤트 버블링 제어
3. 유지보수성 향상

```
// index.html
...
<div id="modal-root"></div>
<div id=root></div>
...

// Modal.jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })

    return createPortal(
        <dialog>{children}
            <form method="dialog">
                <button>{buttonCaption}</button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    )
})

export default Modal
```

## formData

React에서 폼 데이터 관리

```
funtion handleSubmit(event){
    event.preventDefault(); //기본 fetch차단

    const fd = new FromData(event.target)
    const checkboxChannel = fd.getAll('checkboxName'); //같은 이름을 가진 데이터들을 배열로 가져옴, 주로 체크박스
    const data = Object.fromEntries(fd.entries()); //고유한 이름들을 객체로 가져옴
    data.checkboxChannel = checkboxChannel //데이터에 체크박스 추가

}

//onSubmit에 이벤트 핸들러
<form onSubmit={handleSubmit}>

    <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
    </div>
    ...

    <div>
        <button type="reset"> //reset 타입은 입력값들 초기화
        reset
        </button>
        <button type="button" onClick="customSubmit"> //button 타입은 기본동작 없이 별도의 이벤트로 동작
        button
        </button>
        <button type="submit"> //submit 타입은 기본적으로 fetch진행, form의 onSubmit으로 제어 가능
        Sign up
        </button>
    <div>
</form>

```
