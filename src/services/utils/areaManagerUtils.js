import { GetAuthorise, GetAreaDisputedNotes } from "../areaManagerApi";
import {
  GET_AUTHORISE_DOORSTAFF,
  GET_AUTHORISE_COSTS,
} from "../../redux/types/authoriseTypes";
import {
  GetBadResponse,
  GetResponse,
} from "../../redux/actions/debugConsoleActions";
import isErrorStatus from "../../utils/checkStatusCode";

export function GetAuthoriseAndNotes(token, system, dispatch) {
  GetAuthorise(token, system)
    .then((res) => {
      if (isErrorStatus(res)) {
        dispatch(GetBadResponse("get notes error", res, "authorise"));
      }
      switch (system) {
        case "S":
          dispatch({
            type: GET_AUTHORISE_DOORSTAFF,
            data: res.data.reportRecord,
          });

          break;
        case "A":
          dispatch({
            type: GET_AUTHORISE_COSTS,
            data: res.data.reportRecord,
          });
          break;
      }

      res.data.reportRecord.forEach((r) => {
        GetAreaDisputedNotes(token, system, r.activityId)
          .then((notesData) => {
            switch (system) {
              case "S":
                dispatch({
                  type: "GET_DOORSTAFF_DISPUTED_NOTE_LIST",
                  activityID: r.activityId,
                  data: notesData.data.record,
                });
                break;
              case "A":
                dispatch({
                  type: "GET_COSTS_DISPUTED_NOTE_LIST",
                  activityID: r.activityId,
                  data: notesData.data.record,
                });
                break;
            }
          })
          .catch((e) =>
            dispatch(GetBadResponse("get notes error", e, "authorise"))
          );
      });
    })
    .catch((e) => {
      dispatch(GetBadResponse("get authorise error", e, "authorise"));
    });
}
