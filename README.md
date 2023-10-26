# Ralph Lauren

React와 firebase를 사용하여 랄프 로렌 쇼핑몰을 코딩하였습니다.<br>
관리자 계정으로 로그인 했을 떄 상품을 등록할 수 있는 메뉴가 보이도록 하였습니다.<br>
또한 이미지 업로드는 cloudinary를 사용하여 업로드 할 수 있도록 코딩했습니다.<br>

<br>

## 💡 목차
[사용 언어](#개발-환경) <br>
[코드 내용](#코드-내용)

<br>

## ⚙️ 개발 환경
React, react-router-dom, firebase tailwind, scss

<br>


## ✒️ 코드 내용
- [firebase 구글 로그인 기능 구현](#firebase-구글-로그인-기능-구현) <br>
- [firebase 특정 계정에 admin 권한 부여](#firebase-특정-계정에-admin-권한-부여) <br>
- [cloudinary 사용하여 이미지 업로드](#cloudinary-사용하여-이미지-업로드) <br>

### firebase 구글 로그인 기능 구현

firebase를 사용하여 내비게이션 바 안에 구글 로그인 기능을 구현합니다.<br>
우선 터미널에 firebase를 설치한 후 해당 프로젝트 firebase 콘솔의 설정 → 프로젝트 설정 → 내 앱 SDK 설정 및 구성 안에 있는 내용을 firebase.js에 작성합니다.<br>


```js
// firebase.js

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

export async function logout() {
  return signOut(auth) // null값이 리턴됨
  .then(() => {}) // null
  // .catch((error) => {});
}
```

<br>

### firebase 특정 계정에 admin 권한 부여

```js
// firebase.js

// 2. 사용자가 어드민 권한이 있는지 확인 -> isAdmin을 user 안에 넣음
// 데이터베이스 안에 있는 admins를 참조하는 함수
async function adminUser(user) {
  // database 안에 admins key가 있음
  return (
    get(ref(database, "admins")) // ref(database이름, key값)
      // 만약 snapshot(결과값)이 존재하면
      .then((snapshot) => {
        if (snapshot.exists()) {
          const admins = snapshot.val(); // snapshot의 value
          const isAdmin = admins.includes(user.uid); // admins가 user.uid를 포함하는지(boolean값)
          return { ...user, isAdmin }; // 많은 user들의 항목(전체 항목) 중에서 isAdmin 값을 끼워넣음
        }
        return user;
      })
  );
}
```

<br>

### cloudinary 사용하여 이미지 업로드

```js
// uploader.js

// https://console.cloudinary.com/documentation/upload_images
// * 11. uploadImage 함수 선언 (cloudinary에 올라감)
export async function uploadImage(file) {
  const data = new FormData();
  const url = process.env.REACT_APP_CLOUDINARY_URL;

  // 파일이 하나이기 때문에 for문 필요 없음
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

  return fetch(url, {
    method: "POST",
    body: data
  })
  .then((res) => res.json()) // json 형식으로 가져옴
  .then((data) =>  data.url) // url만
}
```

<br>
---

