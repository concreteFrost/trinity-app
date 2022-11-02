import s from "./Navbar.module.scss";
import { NavbarList } from "./NavbarList/NavbarList";
import { NavbarHeader } from "./NavbarHeader/NavbarHeader";

export const Navbar = () => {
  return (
    <div className={s.container}>
        <NavbarHeader></NavbarHeader>
        <NavbarList></NavbarList>
    </div>
  );
};
