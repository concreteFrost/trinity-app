import s from "./DoorstaffTable.module.scss"

export const DoorstaffTable = (props) => (
  <div className={s.container}>
    <table className={s.doorstaff_table}>
      <thead>
        <tr>
          <th>SURNAME</th>
          <th>FIRST NAME</th>
          <th>JOB ROLE</th>
          <th>START TIME</th>
          {props.isVisible ? <th>SIGN OUT</th> : null}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NOBLE</td>
          <td>DONOVAN</td>
          <td>DOOR PERSON</td>
          <td>25/11/2022</td>
          {props.isVisible ? <td><button>SIGN OUT</button></td> : null}
        </tr>
        <tr>
          <td>NOBLE</td>
          <td>DONOVAN</td>
          <td>DOOR PERSON</td>
          <td>25/11/2022</td>
          {props.isVisible ? <td><button>SIGN OUT</button></td> : null}
        </tr>
        <tr>
          <td>NOBLE</td>
          <td>DONOVAN</td>
          <td>DOOR PERSON</td>
          <td>25/11/2022</td>
          {props.isVisible ? <td><button>SIGN OUT</button></td> : null}
        </tr>
        <tr>
          <td>NOBLE</td>
          <td>DONOVAN</td>
          <td>DOOR PERSON</td>
          <td>25/11/2022</td>
          {props.isVisible ? <td><button>SIGN OUT</button></td> : null}
        </tr>
      </tbody>
    </table>
  </div>
);
