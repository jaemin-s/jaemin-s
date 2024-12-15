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
