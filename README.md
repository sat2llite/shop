# Ralph Lauren

React와 firebase를 사용하여 랄프 로렌 쇼핑몰을 코딩하였습니다.

<br>

## ⚙️ 개발환경

React, react-router-dom, firebase tailwind, scss

<br>

## ✒️ 코드 리뷰

firebase를 사용하여 내비게이션 바 안에 구글 로그인 기능을 구현하였습니다.

```js
// firebasae.js

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

// * 함수 선언은 firebase 안에서 함
export function login() {
  return signInWithPopup(auth, provider) // 아래 리턴된 user 값을 받아와서 결과값으로 내보내기 위해 return 작성
    .then((result) => {
      // 로그인 되었는지 결과를 얻어옴
      const user = result.user;
      // console.log("user? : ", user);
      return user.displayName;
    })
    .catch(console.error);
}

export function logout() {
  return signOut(auth) // null값이 리턴됨
  .then(() => {}) // null
  // .catch((error) => {});
}
```

```jsx
// Navbar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import { login, logout } from "../api/firebase";

export default function Navbar() {
  const [user, setUser] = useState();

  // onClick에 login 함수를 넣지 않고 이렇게 작성하는 이유는 firebase.js에 있는 user를 받아와서 useState에 집어넣기 위함
  /** 
   * 로그인할 때 사용되는 함수
   */
  const handleLogin = () => {
    login().then(setUser);
  };
  const handleLogout = () => {
    logout().then(setUser); // useState의 user를 비운다. (null 상태로 만듦)
  };

  return (
    <div className="border-b border-t-slate-300">
      <div className="w-full max-w-screen-2xl m-auto">
        <header className="flex justify-between items-center p-5">
          <h1 className="text-3xl font-logoFont tracking-widest">
            RALPH<span className="pl-3 md:pl-6">LAUREN</span>
          </h1>

          <nav className="flex items-center gap-4">
            <Link to="/products">Product</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/products/new">
              <HiPencilAlt />
            </Link>
            {!user && <button onClick={handleLogin}>login</button>}
            {user && <button onClick={handleLogout}>logout</button>}
          </nav>
        </header>
      </div>
    </div>
  );
}
```

<br>
