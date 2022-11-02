import s from "./HeaderImage.module.scss"
import Logo from "../../images/central_logo/trinity_logo.png"

export const HeaderImage = () => (
            <div className={s.container}>
               <img src={Logo} alt="Logo" />
            </div>
    );
