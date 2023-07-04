import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import { addOrUpdateToCart } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductDetail() {
  // 여러군데 가져다 사용할 용도(현재 사용자를 알아오는 용도)
  const { uid } = useAuthContext();

  const {
    state: {
      product: { id, category, description, image, options, price, title },
    },
  } = useLocation();
  // select에서 어떤 것을 선택했는지 알기 위해 useState 정의
  const [selected, setSelected] = useState(options && options[0]);
  const [success, setSuccess] = useState(); //성공표시

  // *useQuery Mutation - 실시간 업데이트를 위해서 사용
  // (product) - addOrUpdateToCart에서 사용하는 key값
  const queryClient = useQueryClient();
  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      // carts key를 가진 쿼리를 무효화(+ uid를 확인하고 바로 업데이트 요청. staleTime)
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    }
  );

  const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log("select에서 발생하는 이벤트 e.target.value : ", e.target.value);
  };

  // 장바구니에 추가
  const handleClick = (e) => {
    const product = { id, title, image, options: selected, price, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었습니다.");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
    // addOrUpdateToCart(uid, product);
  };
  // console.log("useLocation? : ", aa);

  return (
    <div className='w-full max-w-screen-xl m-auto py-24 md:py-40'>
      <section className="flex flex-col gap-4 md:gap-12 md:flex-row p-4">
        <img className='w-full basis-7/12' src={image} alt={title} />
        <div className='w-full basis-5/12 flex flex-col p-8 md:p-0'>
          <p className='text-slate-700'>여성의류 / {category}</p>
          <h2 className='text-2xl font-bold py-6'>{title}</h2>
          <p className='text-xl pt-4 pb-10 text-red-700 border-b border-gray-400'>{`₩${price}`}</p>
          <p className='py-4 text-sm'>{description}</p>
          <div className='flex items-center'>
            <label className='text-brand' htmlFor='select'>옵션</label>
            {/* 어떤 옵션을 선택했는지 알기 위함 */}
            <select 
              className='p-2 m-4 flex-1 border border-slate-300 outline-none'
              id="select" 
              onChange={handleSelect} 
              value={selected}
            >
              {options && options.map((option,index)=>( 
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          { success && (<p className='text-center text-2xl pb-6'> ✅ {success}</p>)}
          <Button onClick={handleClick} text='장바구니에 추가' />
        </div>

      </section>
    </div>
  );
}
