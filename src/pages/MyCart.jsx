import React from "react";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import CartItem from "../components/CartItem";
import Button from "../components/ui/Button";
import { PiPlusCircleThin, PiEquals } from "react-icons/pi";

// 배송비
const SHIPPING = 3000;
const MONEY_CLASS = "text-2xl text-red-600";

export default function MyCart() {
  // 현재 사용자가 누군지 알아오는 함수
  const { uid } = useAuthContext();
  // key값, 내용을 가져오는 함수
  const { isLoading, data: products } = useQuery(["carts", uid || ""], () => getCart(uid), {staleTime: 1000}); // useQuery로 data를 products로 이름 변경

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0; // 쇼핑카트에 아이템이 있는지 검사함
  const totalPrice = products && products.reduce((sum, value) => sum + (parseInt(value.price) * value.quantity), 0);

  return (
    <section className="w-full max-w-screen-xl m-auto py-24 md:py-40">
      <div className="flex flex-col">
        <h2 className="text-center text-2xl font-bold pb-4 border-b border-slate-300">
          내 장바구니
        </h2>
        <div>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {!hasProducts && (
              <p className="text-center py-20">장바구니가 비어있습니다.</p>
            )}
            {products &&
              products.map((item) => (
                <CartItem key={item.id} item={item} uid={uid} />
              ))}
          </ul>

          <div className="flex justify-between items-center mb-8 pb-8 px-2 md:px-8 lg:px-20 text-center border-b border-gray-300">
            <div>상품 금액 <p className={MONEY_CLASS}>{`₩${totalPrice}`}</p></div>
            <PiPlusCircleThin className="text-lg" />
            <div>배송 금액 <p className={MONEY_CLASS}>₩{SHIPPING}</p></div>
            <PiEquals />
            <div>전체 금액 <p className={MONEY_CLASS}>₩{totalPrice + SHIPPING }</p></div>
          </div>

          <div className="text-center">
            <Button text="주문하기" />
          </div>
        </div>
      </div>
    </section>
  );
}
