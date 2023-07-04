import React from "react";
import {
  PiMinusSquareLight,
  PiPlusSquareLight,
  PiXLight,
} from "react-icons/pi";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// uid는 MyCart에서 이미 불러온 것을 props로 받아와서 사용
export default function CartItem({
  item,
  item: { id, image, title, options, price, quantity },
  uid,
}) {
  const queryClient = useQueryClient();
  const addOrUpdatePlus = useMutation(
    (item) => addOrUpdateToCart(uid, { ...item, quantity: quantity + 1 }),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
      //carts키를 가진 쿼리를 무효화(+uid를 확인하고 바로 업데이트 해줘!)
    }
  );
  const addOrUpdateMinus = useMutation(
    (item) => addOrUpdateToCart(uid, { ...item, quantity: quantity + 1 }),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
      //carts키를 가진 쿼리를 무효화(+uid를 확인하고 바로 업데이트 해줘!)
    }
  );
  const removeCart = useMutation(() => removeFromCart(uid, id), {
    onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    //carts키를 가진 쿼리를 무효화(+uid를 확인하고 바로 업데이트 해줘!)
  });

  const handleMinus = () => {
    if (quantity < 2) return; // 갯수가 1일때는 더 감소하지 못하게 조건문 추가
    addOrUpdateMinus.mutate(item);
    // addOrUpdateToCart(uid, { ...item, quantity: quantity - 1 }); // 전부 펼친 후 기존의 quantity에서 1 감소
    // 앞의 전체들 중 quantity만 업데이트한다
  };

  const handlePlus = () => {
    addOrUpdatePlus.mutate(item);
    // addOrUpdateToCart(uid, { ...item, quantity: quantity + 1 }); // 전부 펼친 후 기존의 quantity에서 1 증가
  };

  const handleDelete = () => {
    removeCart.mutate(uid, id);
  };

  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-24 md:w-36 rounded-lg" src={image} alt={title} />
      <div className="flex-1 justify-between ml-4">
        <div className="">
          <p className="text-lg truncate">{title}</p>
          <p className="text-xl text-brand">{options}</p>
          <p>{`₩${price}`}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-lg">
        <PiMinusSquareLight className="text-slate-400" onClick={handleMinus} />
        <span className="">{quantity}</span>
        <PiPlusSquareLight className="text-slate-400" onClick={handlePlus} />
        <PiXLight className="text-xl" onClick={handleDelete} />
      </div>
    </li>
  );
}
