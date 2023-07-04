import React from "react";

// * 3. 유저를 나타내는 User.jsx 만듦
export default function User({ user: { displayName, photoURL } }) {
  // console.log("user: ", user);
  return (
    // shrink : 부모 영역이 줄면 자식 item들도 같이 줄어듦 - shrink-0은 그것을 방지해줌
    <div className="flex items-center shrink-0">
      <img
        className="w-10 h-10 rounded-full mr-2"
        src={photoURL}
        alt={displayName}
      />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
}
