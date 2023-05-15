import s from "./Footer.module.scss"
import { ReactComponent as CocoonLogo } from "../../images/cocoonCompressed.svg";

export const Footer = () => {
    return (
        <footer className={s.container}>
            <nav>
                <div className={s.grid}>
                    <div className={s.contact}>contact</div>
                    <div className={s.phone}> phone : xx-xxx-xxx-xx</div>
                    <div className={s.email}> email : xxxx@cocoon.co.uk</div>
                    <div className={s.copyright}>©cocoon 2023 | all rights reserved</div>
                    <div className={s.logo} ><CocoonLogo></CocoonLogo></div>

                </div>
                <div className={s.help}>
                    <a href="#">Help</a> </div>

            </nav>
        </footer>
    )
}

{/* <div className={s.info}>contact</div>
<div className={s.contact}>
    phone : xx-xxx-xxx-xx ||
    email : xxxx@cocoon.co.uk
</div>

<div className={s.logo_copyright}>
    {/* <div ><CocoonLogo className={s.logo}></CocoonLogo></div> */}
//     <div className={s.copyright}>©cocoon 2023</div>
// </div>
