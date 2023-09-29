import { GetAuthorise, GetAreaDisputedNotes } from "../areaManagerApi";
import { GET_AUTHORISE_DOORSTAFF, GET_AUTHORISE_COSTS } from "../../redux/types/authoriseTypes";


export function GetAuthoriseAndNotes(token, system, dispatch) {
  GetAuthorise(token, system)
    .then((res) => {
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
            console.log('sadasddas', notesData.data.record)
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
          .catch((e) => console.log(e))
      });

    })
    .catch((e) => {
      console.log(e);
    });
}