import { BsSun, BsMoon } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa";
import { useGlobalContext } from "./AppProvider";
function Aside() {
  const { isLight, setIsLight, useThemeLocalStorage } = useGlobalContext();
  return (
    <aside className="aside">
      <div className="col-sm-6">
        <div className="logo">
          <a href="/">
            <img src="./image/logo.png" alt="logo" />
          </a>
        </div>
      </div>
      <div className="col-sm-6 text-center">
        <div className="setting">
          <div className="theme">
            <button
              className="toggle-theme"
              onClick={() => {
                setIsLight(!isLight);
                localStorage.setItem("light", !isLight);
              }}
            >
              {useThemeLocalStorage ? <BsMoon /> : <BsSun />}
            </button>
          </div>
          <div className="user">
            <a
              href="https://github.com/MostafaIsmaiel"
              target="_blank"
              rel="noreferrer"
            >
              <FaUserSecret />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
