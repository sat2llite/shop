import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product, // productDetail 페이지로 넘겨 줄 용도
  product: { id, image, title, price, category },
}) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/products/${id}}`, { state: { product } });
      }}
      className="rounded-sm hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 pb-6"
    >
      <img className="w-full" src={image} alt={title} />
      <div className="flex justify-between items-center mt-6 mb-2 px-2">
        <h3 className="truncate">{title}</h3>
        <p className=" text-red-700 text-sm">{`₩${price}`}</p>
      </div>
      <p className="text-sm text-slate-400 pl-2">{category}</p>
    </li>
  );
}
