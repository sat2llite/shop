// * 9. 이미지, 제품 업로드
import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  // * 10. 각 제품에 입력한 모든 데이터들을 모아주는 역할(오브젝트)
  const [product, setProduct] = useState({});

  // *9-2. 이미지 주소(로컬)를 임시로 저장
  const [file, setFile] = useState();

  const [isUploading, setIsUploading] = useState(false); //업로드중
  const [success, setSuccess] = useState(); //성공표시

  // * 9-1. 함수 선언
  const handleChange = (e) => {
    // file은 경로, files는 array 형태로 들어옴
    // console.log(e.target.files);
    const { name, value, files } = e.target;
    // https://res.cloudinary.com/dbisxzspp/image/upload/v1687922119/cld-sample-5.jpg
    if (name === "img") {
      setFile(files && files[0]); // 맨 첫 번째
      return;
    }
    // * 10-1. 없는 내용이 있으면 계속 추가하도록
    setProduct((product) => ({ ...product, [name]: value }));
    // console.log("product", product);
  };

  // 버튼을 누르면 작동하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    // * 11. uploadImage 함수 실행
    // file - 이미지
    // promise
    uploadImage(file)
      .then( url => {
        //이미지 주소받아옴
        console.log(url);
        console.log("product", product.options.split(","));
        addNewProduct(product, url) //파이어베이스에 데이타자료 입력
          .then(() => {
            setSuccess("성공적으로 제품이 추가되었습니다");
            setTimeout(() => {
              setSuccess(null);
            }, 4000);
          });
      })
      .finally(() => setIsUploading(false));
  };

  return (
    // * 9-3. 이미지 업로드 전 미리보기(preview) 이미지를 보여줌
    <section className="w-full max-w-screen-xl m-auto pt-36 ">
      {success ? (
        <p className="text-center text-2xl pb-6"> ✅ {success}</p>
      ) : (
        <h2 className="text-2xl font-bold text-center pb-6">
          새로운 제품 등록
        </h2>
      )}
      {file && (
        <img
          className=" h-52 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="localFile"
        />
      )}
      <form className="flex flex-col px-12" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="img"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="제품명"
          onChange={handleChange}
          value={product.title ?? ""}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="가격"
          onChange={handleChange}
          value={product.price ?? ""}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="카테고리"
          onChange={handleChange}
          value={product.category ?? ""}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="제품설명"
          onChange={handleChange}
          value={product.description ?? ""}
          required
        />
        <input
          type="text"
          name="options"
          placeholder="옵션들(콤마(,)로 구분)"
          onChange={handleChange}
          value={product.options ?? ""}
          required
        />
        <Button text={isUploading ? "업로드중..." : "제품 등록하기"} />
      </form>
    </section>
  );
}
