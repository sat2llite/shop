import { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange, login, logout } from "../../api/firebase";

// * 7-2. context 생성
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  // * 7-4. Navbar.jsx에서 가져옴
  // 로그인 여부
  const [user, setUser] = useState();

  // 화면이 마운트될 때(reload될 때) 로그인이 되어있는지 아닌지 상태를 알아보는 함수 호출
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      console.log("user? : ", user); // admin을 만들고 싶은 유저의 uid를 확인하기 위해 작성
    });
  }, []);

  return (
    // context는 컴포넌트 역할을 할 수 있음
    // * 7-3. 영역 지정(우산). 보통 최상위단계(App.js or index.js)
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// * 7-5. useContext를 직접 사용하지 않고 함수로 정의하여 함수 호출
export function useAuthContext() {
  return useContext(AuthContext);
}
