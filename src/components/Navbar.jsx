import { Link } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "./context/AuthContext";
import CartStatus from "./CartStatus";

// // * 1-1. useState 선언
// 로그인 여부
export default function Navbar() {

  // * 7-6. useAuthContext 사용
  const { user, login, logout } = useAuthContext();

  // const [user, setUser] = useState();

  // // * 2. 화면이 마운트될 때(reload될 때) 로그인이 되어있는지 아닌지 상태를 알아보는 함수 호출
  // useEffect(() => {
  //   onUserStateChange((user) => {
  //     setUser(user);
  //     console.log("user? : ", user); // admin을 만들고 싶은 유저의 uid를 확인하기 위해 작성
  //   });
  // }, []);

  // // * 1-2. onClick에 login 함수를 넣지 않고 이렇게 작성하는 이유는 firebase.js에 있는 user를 받아와서 useState에 집어넣기 위함
  /**
   * 로그인할 때 사용되는 함수
   */
  // 리팩토링
  // const handleLogin = () => {
  //   login().then(setUser);
  // };
  // const handleLogout = () => {
  //   logout().then(setUser); // useState의 user를 비운다. (null 상태로 만듦)
  // };

  return (
    <div className="fixed w-full z-10 border-b border-slate-50/20 text-slate-500 hover:text-black hover:bg-white transition duration-500 bg-white bg-opacity-10">
      <div className="w-full max-w-screen-2xl m-auto">
        <header className="flex justify-between items-center p-2 md:p-5">
          <Link to="/">
            <h1 className="text-lg md:text-3xl font-logoFont tracking-normal md:tracking-widest">
              RALPH<span className="pl-3 md:pl-6">LAUREN</span>
            </h1>
          </Link>
          <nav className="flex items-center gap-2 md:gap-4 text-sm md:text-base">
            <Link to="/products">Product</Link>

            {/* cart를 CartStatus라는 컴포넌트로 따로 빼서 작성 */}
            {user && <Link to="/cart" className="pr-1"><CartStatus /></Link>}
            
            {/* // * 5. isAdmin이 true일 때만 보이도록 */}
            {user && user.isAdmin && (
              <Link to="/products/new">
                <HiPencilAlt />
              </Link>
            )}

            {/* // *3. User.jsx - user가 없을 경우 실행 */}
            {user && <User user={user} />}

            {/*// * 1-2. */}
            {/* // * 2-1. 따로 선언하지 않고 firebase 안에 있는 함수를 바로 호출 */}
            {/* // * 6. Button 컴포넌트로 전환 */}
            {!user && <Button onClick={login} text={"login"} />}
            {user && <Button onClick={logout} text={"logout"} />}
          </nav>
        </header>
      </div>
    </div>
  );
}
