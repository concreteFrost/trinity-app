import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetActivitySupplierOptAPI } from "../../../../../services/activityApi";
import isErrorStatus from "../../../../../utils/checkStatusCode";
import { GetBadResponse } from "../../../../../redux/actions/debugConsoleActions";

export default function SupplierElement({
  options,
  setOptions,
  activity,
  setActivity,
}) {
  const token = useSelector((state) => state.userReducer.user.access_token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (options.selectedTypeId == -1) {
      setOptions((prev) => {
        {
          return { ...prev, suppliers: [] };
        }
      });
      return;
    }

    const fetchSuppliers = async () => {
      try {
        const res = await GetActivitySupplierOptAPI(
          token,
          options.selectedTypeId
        );

        if (isErrorStatus(res)) {
          dispatch(
            GetBadResponse(
              "get activity supplier group success",
              res,
              "activity"
            )
          );
        }

        setOptions((prev) => {
          {
            return { ...prev, suppliers: res.data.suppliers };
          }
        });
      } catch (e) {
        dispatch(
          GetBadResponse("get activity supplier group error", e, "activity")
        );
      }
    };

    fetchSuppliers();
  }, [options.selectedTypeId]);

  function setSupplier(e) {
    setActivity((prev) => {
      return { ...prev, supplierId: e.target.value };
    });
  }

  return (
    <>
      <label htmlFor="supplier">SUPPLIER</label>
      <select
        name="supplier"
        disabled={options.suppliers.length === 0}
        onChange={(e) => {
          setSupplier(e);
        }}
      >
        <option value={-1}>Select Supplier</option>

        {options.suppliers.length > 0
          ? options.suppliers.map((e) => {
              return (
                <option key={e.supplierId} value={e.supplierId}>
                  {e.supplierName}
                </option>
              );
            })
          : null}
      </select>
    </>
  );
}
