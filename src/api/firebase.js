import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, get, set, ref, remove } from "firebase/database";
import uuid from "react-uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

// * 1-1. 함수 선언은 firebase 안에서 함
export function login() {
  return signInWithPopup(auth, provider) // 아래 리턴된 user 값을 받아와서 결과값으로 내보내기 위해 return 작성
    .then((result) => {
      // 로그인 되었는지 결과를 얻어옴
      const user = result.user;
      // console.log("user? : ", user);
      return user;
    })
    .catch(console.error);
}

export async function logout() {
  return signOut(auth) // null값이 리턴됨
    .then(() => null); // null
  // .catch((error) => {});
}

// * 2. 화면이 마운트될 때(reload될 때) 로그인이 되어있는지 아닌지 상태를 알아보는 함수 선언 (callback)
export function onUserStateChange(callback) {
  // 만약 user가 있을 경우
  onAuthStateChanged(auth, async (user) => {
    // ? 1. 사용자가 로그인 한 경우
    // user && adminUser(user);
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

// * 4. 실시간 데이터베이스 사용 선언
const database = getDatabase(app);

// ? 2. 사용자가 어드민 권한이 있는지 확인 -> isAdmin을 user 안에 넣음
// 데이터베이스 안에 있는 admins를 참조하는 함수
async function adminUser(user) {
  // database 안에 admins key가 있음
  return (
    get(ref(database, "admins")) // ref(database이름, key값)
      // 만약 snapshot(결과값)이 존재하면
      .then((snapshot) => {
        if (snapshot.exists()) {
          const admins = snapshot.val(); // snapshot의 value
          // admins가 user.uid를 포함함
          const isAdmin = admins.includes(user.uid);
          return { ...user, isAdmin }; // 많은 user들의 항목 중에서 isAdmin만 끼워넣음
        }
        return user;
      })
  );
}

//제품등록
export async function addNewProduct(product, image) {
  const id = uuid();
  console.log(id);
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    options: product.options.split(","),
    image,
  });
}

//제품가져오기
export async function getProduct() {
  return get(ref(database, "products")).then((snapshot) => {
    // exists : 존재할 때만 value값 불러옴
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
  });
}

// 사용자의 카트에 추가하거나 업데이트 (제품등록과 비슷한 로직)
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

// 특정 사용자의 장바구니(cart)를 가져옴
export async function getCart(userId) {
  // products만 불러오는게 아닌 carts안의 특정 id를 가져와야 함
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

// 장바구니 제품 삭제
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

/*
  1. 사용자가 로그인 한 경우
  2. 사용자가 어드민 권한이 있는지 확인
  3. 사용자에게 알려줌
 */
