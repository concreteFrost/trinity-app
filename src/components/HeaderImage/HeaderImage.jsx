import s from "./HeaderImage.module.scss"
import { useNavigate } from "react-router-dom";
// import Logo from "../../images/central_logo/trinity_logo.png"

export const HeaderImage = () => {

   const nav = useNavigate();
   return (
      <div className={s.container} onClick={() => { nav('/home') }}> 
         {/* <img src={Logo} alt="Logo" /> */}
         <h1>TRINITY</h1>
      </div>
   );
}
