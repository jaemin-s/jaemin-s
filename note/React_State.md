## State 관리

1. 불변성 유지 : 스프레드를 사용하여 이전 상태를 복사한 후 특정 필드만 업데이트하여 불변성을 유지
2. 상태 업테이트 함수 : 이전 상태를 매개변수로 받아서 안전하게 처리
3. 동적으로 객체 키 설정 : 하나의 핸들러로 여러 필드 처리
4. 문자열 상수로 정의 : 타입 안정성과 유지보수성을 위하여 마무리 단계에서 상수로 정의

```
import { useState } from 'react';

// 필드명을 상수로 정의
const USER_FIELDS = {
    NAME : 'name',
    EMAIL : 'email',
    PHONE : 'phone'
} as const

// 초기값을 상수로 분리하여 관리
// 컴포넌트 외부에 선언하여 리렌더링 시에도 재생성되지 않음
const INITIAL_USERINFO = {
    [USER_FIELDS.NAME] : 'username',
    [USER_FIELDS.EMAIL] : 'username@sample.com'
    [USER_FIELDS.PHONE] : '01023456789'
}

const SampleComponent = () => {
    // useState를 사용하여 userInfo 상태 관리
    // INITIAL_USERINFO를 초기값으로 설정
    const [userInfo, setUserInfo] = useState(INITIAL_USERINFO)

    funtion handleChange(inputIdentifier, newValue){
        // 이전 상태를 기반으로 새로운 상태를 설정
        setUserInfo(prevUserInfo => {
            return {
                ...prevUserInfo, // 스프레드 연산자로 이전 상태의 모든 값을 복사
                [inputIdentifier] : newValue // computed property name을 사용하여 특정 필드만 업데이트
            }
        })
    }

    return (
        <div>
            <CustomInput onChange={(event)=>{handleChange(USER_FIELDS.NAME,event.target.value)}}/>
            <CustomInput onChange={(event)=>{handleChange(USER_FIELDS.EMAIL,event.target.value)}}/>
            <CustomInput onChange={(event)=>{handleChange(USER_FIELDS.PHONE,event.target.value)}}/>
        </div>
    )
}
```

### Context API

```
// CartContext.js
import { createContext, useReducer } from 'react'

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {}
})

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const updatedItems = [...state.items]
            const existingCartItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            )

            if (existingCartItemIndex > -1) {
                const existingItem = updatedItems[existingCartItemIndex]
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                }
                updatedItems[existingCartItemIndex] = updatedItem
            } else {
                updatedItems.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    quantity: 1
                })
            }

            return {
                items: updatedItems,
            }
        }

        case 'UPDATE_QUANTITY': {
            const updatedItems = [...state.items]
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.productId
            )

            const updatedItem = {
                ...updatedItems[updatedItemIndex]
            }

            updatedItem.quantity += action.payload.amount

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1)
            } else {
                updatedItems[updatedItemIndex] = updatedItem
            }

            return {
                items: updatedItems,
            }
        }

        default:
            return state
    }
}

export default function CartContextProvider({children}) {
    const [cartState, dispatch] = useReducer(cartReducer, {
        items: []
    })

    function handleAddItemToCart(product) {
        dispatch({
            type: 'ADD_ITEM',
            payload: product
        })
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: {
                productId,
                amount
            }
        })
    }

    const ctxValue = {
        items: cartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}

// App.jsx
import { CartContextProvider } from './CartContext'
import Header from './Header'
import Shop from './Shop'

export default function App() {
    return (
        <CartContextProvider>
            <Header />
            <Shop />
        </CartContextProvider>
    )
}

// Header.jsx
import { useContext } from 'react'
import { CartContext } from './CartContext'

export default function Header() {
    const { items } = useContext(CartContext)

    const totalCartItems = items.reduce((total, item) => {
        return total + item.quantity
    }, 0)

    return (
        <header>
            <h1>Our Shop</h1>
            <p>Cart Items: {totalCartItems}</p>
        </header>
    )
}

// Shop.jsx
import { useContext } from 'react'
import { CartContext } from './CartContext'

export default function Shop() {
    const { addItemToCart } = useContext(CartContext)

    const products = [
        { id: 'p1', name: 'Product 1', price: 10 },
        { id: 'p2', name: 'Product 2', price: 20 }
    ]

    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <p>{product.name} (${product.price})</p>
                    <button onClick={() => addItemToCart(product)}>
                        Add to Cart
                    </button>
                </li>
            ))}
        </ul>
    )
}
```
