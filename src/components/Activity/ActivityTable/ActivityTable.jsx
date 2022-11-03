import s from "./ActivityTable.module.scss"

export const ActivityTable = (props) => (
    <div className={s.container}>
    <table className={s.doorstaff_table}>
        <thead>
            <tr>
              <th>DATE</th>
              <th>COST</th>
              <th>SUPPLIER</th>
              <th>VALUE</th>
            {props.isVisible ? <th>EDIT</th> : null }  
            </tr>
        </thead>
        <tbody>
            <tr>
              <td>11/3/2022 9:28:07 AM</td>
              <td>WINDOWS</td>
              <td>D H WINDOW CLEANING</td>
              <td>90.00</td>
              {props.isVisible ? <td><button>EDIT</button></td> : null }    
            </tr>
            <tr>
              <td>11/3/2022 9:28:07 AM</td>
              <td>WINDOWS</td>
              <td>D H WINDOW CLEANING</td>
              <td>90.00</td>
              {props.isVisible ? <td><button>EDIT</button></td> : null } 
            </tr>
            <tr>
              <td>11/3/2022 9:28:07 AM</td>
              <td>WINDOWS</td>
              <td>D H WINDOW CLEANING</td>
              <td>90.00</td>
             {props.isVisible ? <td><button>EDIT</button></td> : null } 
            </tr>
            <tr>
              <td>11/3/2022 9:28:07 AM</td>
              <td>WINDOWS</td>
              <td>D H WINDOW CLEANING</td>
              <td>90.00</td>
             {props.isVisible ? <td><button>EDIT</button></td> : null } 
            </tr>
        </tbody>
    </table>
</div>
    );

