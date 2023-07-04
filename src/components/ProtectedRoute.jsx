import React from "react";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin }) {
  // * 8. useAuthContext 사용 (로그인 여부 나타내기)
  const { user } = useAuthContext();
  // console.log("user? : ", user);

  // 로그인 안 했을 때 맨 첫 페이지로 감
  // requireAdmin : admin을 필요로 함 
  // !user.isAdmin - admin이 아님
  if (!user || (requireAdmin && !user.isAdmin)) {
    // 둘 중 하나라도 true가 있으면 "/"로 넘어감
    return <Navigate to="/" replace={true} />;
    // replace - 히스토리에 넣지 않음(뒤로가기 불가능)
  }

  return children;
}

/*
  1. 로그인 한 사용자가 있는지 확인
  2. 로그인 한 사용자가 admin인지 확인
*/
