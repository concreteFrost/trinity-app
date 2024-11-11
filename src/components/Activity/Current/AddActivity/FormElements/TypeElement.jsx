import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetActivityTypeOptAPI } from "../../../../../services/activityApi";
import isErrorStatus from "../../../../../utils/checkStatusCode";
import { GetBadResponse } from "../../../../../redux/actions/debugConsoleActions";

export default function TypeElement({ options, setOptions }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user.access_token);

  useEffect(() => {
    const fetchTypes = async () => {
      console.log("fetching types");
      try {
        const res = await GetActivityTypeOptAPI(token);

        if (isErrorStatus(res)) {
          GetBadResponse("get activity cost group success", res, "activity");
          return;
        }

        setOptions((prev) => {
          return { ...prev, types: res.data.record };
        });
      } catch (e) {
        dispatch(
          GetBadResponse("get activity cost group error", e, "activity")
        );
      }
    };

    fetchTypes();
  }, []);

  function setTypeId(e) {
    setOptions((prev) => {
      return {
        ...prev,
        selectedTypeId: e.target.value,
      };
    });
  }

  return (
    <>
      <label htmlFor="type" disabled={options.types.length === 0}>
        TYPE
      </label>
      <select
        name="type"
        onChange={(e) => {
          setTypeId(e);
        }}
        defaultValue={null}
        disabled={options.types.length === 0}
      >
        <option value={null}>Select Type</option>
        {options.types.length > 0
          ? options.types.map((e) => {
              return (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              );
            })
          : null}
      </select>
    </>
  );
}
