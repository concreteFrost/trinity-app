import s from "./HeaderImage.module.scss"
import { useNavigate } from "react-router-dom";
// import Logo from "../../images/central_logo/trinity_logo.png"

export const HeaderImage = () => {

   const nav = useNavigate();
   return (
      <div className={s.container}>
         {/* <img src={Logo} alt="Logo" /> */}
         <h1 onClick={() => { nav('/home') }}>TRINITY</h1>
      </div>
   );
}
