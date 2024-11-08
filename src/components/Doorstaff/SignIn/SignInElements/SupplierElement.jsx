import React, { useEffect } from "react";
import s from "../SignIn.module.scss";
import { GetBadResponse } from "../../../../redux/actions/debugConsoleActions";
import { useDispatch, useSelector } from "react-redux";
import isErrorStatus from "../../../../utils/checkStatusCode";
import { ShowModalMessage } from "../../../../redux/actions/modalActions";
import { GetDoorstaffSupplierAPI } from "../../../../services/activityApi";

function SupplierElement({ sia, handleUpdateSia }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user);

  async function SetCurrentSupplier(e) {
    const supplierId = e.target.value;
    const supplierName = e.target.options[e.target.selectedIndex].text;

    if (supplierId == -1) {
      dispatch(ShowModalMessage("Selected supplier is not valid"));
    }

    handleUpdateSia({
      supplier: { supplierId, supplierName },
    });
  }

  function clearSuppliers() {
    handleUpdateSia({
      supplier: { supplierId: -1, supplierName: "" },
      options: { ...sia.options, suppliers: [] },
    });
  }

  async function getSuppliersOpt() {
    if (sia.position.positionId == -1) return;
    try {
      const res = await GetDoorstaffSupplierAPI(
        sia.position.positionId,
        token.access_token
      );

      if (isErrorStatus(res)) {
        dispatch(
          GetBadResponse("get doorstaff positions error", res, "doorstaff")
        );
        return;
      }
      handleUpdateSia({
        options: {
          ...sia.options,
          suppliers: res.data.suppliers,
        },
      });
    } catch (error) {
      dispatch(
        GetBadResponse("get doorstaff positions error", error, "doorstaff")
      );
    }
  }

  useEffect(() => {
    clearSuppliers();
    getSuppliersOpt();
  }, [sia.position.positionId]);

  return (
    <div className={s.supplier}>
      <label>SUPPLIER</label>
      <select
        onChange={(e) => SetCurrentSupplier(e)}
        disabled={sia.position.positionId == -1}
      >
        <option value={-1}>Select the Supplier</option>
        {sia.options.suppliers.map((e) => (
          <option key={e.supplierId} value={e.supplierId}>
            {e.supplierName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SupplierElement;
