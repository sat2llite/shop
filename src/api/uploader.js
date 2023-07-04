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
  .then((res) => res.json())
  .then((data) =>  data.url)
}





// 예시
// const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
// const form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const files = document.querySelector("[type=file]").files;
//   const formData = new FormData();

//   for (let i = 0; i < files.length; i++) {
//     let file = files[i];
//     formData.append("file", file);
//     formData.append("upload_preset", "docs_upload_example_us_preset");

//     fetch(url, {
//       method: "POST",
//       body: formData
//     })
//       .then((response) => {
//         return response.text();
//       })
//       .then((data) => {
//         document.getElementById("data").innerHTML += data;
//       });
//   }
// });
