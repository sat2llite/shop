import React from "react";
import { BsHandbag } from "react-icons/bs";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

export default function CartStatus() {
  // 현재 사용자가 누군지 알아오는 함수
  const { uid } = useAuthContext();
  // key값, 내용을 가져오는 함수
  const { data: products } = useQuery(["carts", uid || ""], () => getCart(uid), {staleTime: 1000});

  // console.log("CartStatus data? : ", products);
  return (
    <div className="relative">
      <BsHandbag className="text-xl" />
      {products && (<p className="absolute -top-1 -right-2 text-sm">{products.length}</p>)}
    </div>
  );
}
