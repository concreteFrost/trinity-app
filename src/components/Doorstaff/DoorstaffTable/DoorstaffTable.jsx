import s from "./DoorstaffTable.module.scss"

export const DoorstaffTable = () => (
    <div className={s.container}>
        <table className={s.doorstaff_table}>
            <thead>
                <tr>
                  <th>SURNAME</th>
                  <th>FIRST NAME</th>
                  <th>JOB ROLE</th>
                  <th>START TIME</th>
                  <th>SELECT</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td>NOBLE</td>
                  <td>DONOVAN</td>
                  <td>DOOR PERSON</td>
                  <td>25/11/2022</td>
                  <td><button>SIGN OUT</button></td>
                </tr>
                <tr>
                  <td>NOBLE</td>
                  <td>DONOVAN</td>
                  <td>DOOR PERSON</td>
                  <td>25/11/2022</td>
                  <td><button>SIGN OUT</button></td>
                </tr>
                <tr>
                  <td>NOBLE</td>
                  <td>DONOVAN</td>
                  <td>DOOR PERSON</td>
                  <td>25/11/2022</td>
                  <td><button>SIGN OUT</button></td>
                </tr>
                <tr>
                  <td>NOBLE</td>
                  <td>DONOVAN</td>
                  <td>DOOR PERSON</td>
                  <td>25/11/2022</td>
                  <td><button>SIGN OUT</button></td>
                </tr>
            </tbody>
        </table>
    </div>
);
