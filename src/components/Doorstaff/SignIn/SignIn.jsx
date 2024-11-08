import s from "./SignIn.module.scss";
import InitialsElement from "./SignInElements/InitialsElement";
import PositionElement from "./SignInElements/PositionElement";
import SupplierElement from "./SignInElements/SupplierElement";
import RateElement from "./SignInElements/RateElement";
import DateTimeElement from "./SignInElements/DateTimeElement";
import ActionsElement from "./SignInElements/ActionsElement";

export const SignIn = ({ sia, setSia, clearDoorstaffData }) => {
  const handleUpdateSia = (updatedFields) => {
    setSia((prevSia) => ({ ...prevSia, ...updatedFields }));
  };

  return (
    <div className={s.container}>
      <form onSubmit={(e) => e.preventDefault()}>
        <InitialsElement
          firstName={sia.doorstaff.firstName}
          lastName={sia.doorstaff.lastName}
        ></InitialsElement>

        <PositionElement
          sia={sia}
          handleUpdateSia={handleUpdateSia}
        ></PositionElement>

        <SupplierElement
          sia={sia}
          handleUpdateSia={handleUpdateSia}
        ></SupplierElement>

        <RateElement sia={sia} handleUpdateSia={handleUpdateSia}></RateElement>

        <DateTimeElement
          sia={sia}
          handleUpdateSia={handleUpdateSia}
        ></DateTimeElement>

        <ActionsElement
          sia={sia}
          clearDoorstaffData={clearDoorstaffData}
        ></ActionsElement>
      </form>
    </div>
  );
};
