import s from "./Navbar.module.scss";
import { NavbarList } from "./NavbarList/NavbarList";
import { NavbarHeader } from "./NavbarHeader/NavbarHeader";
import { HeaderImage } from '../HeaderImage/HeaderImage';

export const Navbar = (props) => {
  return (
    <div className={s.container}>
      <div className={s.logo}><HeaderImage></HeaderImage></div>
      <div className={s.welcome}><NavbarHeader></NavbarHeader></div>
      <div className={s.navlist}><NavbarList></NavbarList></div>
    </div>
  );
};
