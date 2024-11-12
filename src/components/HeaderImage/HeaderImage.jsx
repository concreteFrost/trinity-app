import s from "./HeaderImage.module.scss";
import { useNavigate } from "react-router-dom";

export const HeaderImage = () => {
  const nav = useNavigate();
  return (
    <div
      className={s.container}
      onClick={() => {
        nav("/home");
      }}
    >
      {/* <img src={Logo} alt="Logo" /> */}
      <h1>TRINITY</h1>
    </div>
  );
};
