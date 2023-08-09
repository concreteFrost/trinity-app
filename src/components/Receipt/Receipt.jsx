import s from "./Receipt.module.scss";
import { useSelector } from "react-redux";

export const Receipt = (props) => {

    const receiptData = useSelector((state)=>state.receiptReducer.data)
    const receiptTittle = useSelector((state)=>state.receiptReducer.title);
    const systemToCheck = useSelector((state)=>state.receiptReducer.systemToCheck);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
      
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      }

    return (
        <div className={s.hidden_wrapper} >
         <div className={s.wrapper}  id="receipt" >
            <div className={s.header} >
                <div className={s.title}>{receiptTittle ? receiptTittle : null}</div>
                <div className={s.main_address}>
                    <p>J D Wetherspoon plc</p>
                    <p> Wetherspoon House </p>
                    <p> Central Park</p>
                    <p> Reeds Crescent </p>
                    <p> Watford </p>
                    <p> WD24 4Q </p>
                </div>
                <div className={s.switchboard}>Switchboard: 01923 477777</div>
            </div>
            <div className={s.tables}>
                <div className={s.supplier_info}>

                    <div className={s.supplier_title}>{systemToCheck === "A" ? <span > Supplier:</span> : <span>Door Staff Supplier: </span>}{receiptData.supplierAccount ? receiptData.supplierAccount : null}</div>
                    <div className={s.supplier_address}>
                        <p>{receiptData.supplierName ? receiptData.supplierName : null}</p>
                        <p>{receiptData.supplierAddress1 ? receiptData.supplierAddress1 : null}</p>
                        <p>{receiptData.supplierAddress2 ? receiptData.supplierAddress2 : null}</p>
                        {/* leave this for city title */}
                        <p>{receiptData.supplierPostcode ? receiptData.supplierPostcode : null}</p>
                    </div>

                    <p>
                        <span className={s.supplier_telephone}>Telephone:
                        </span>
                        {receiptData.supplierPhone ? receiptData.supplierPhone : null}
                    </p>
                </div>
                <div className={s.pub_info}>

                    <div className={s.pub_title}> <span> Pub:</span></div>
                    <div className={s.pub_address}>
                       <p>{receiptData.locationName ? receiptData.locationName : null}</p>
                       <p>{receiptData.locationAddress1 ? receiptData.locationAddress1 : null}</p>
                       <p>{receiptData.locationAddress2 ? receiptData.locationAddress2 : null}</p>
                       {/*leave this for city tittle*/}
                       <p>{receiptData.locationPostcode ? receiptData.locationPostcode : null}</p>
                    </div>


                    <div className={s.pub_telephone}><span>Telephone:</span>{receiptData.locationPhone ? receiptData.locationPhone : null}</div>
                </div>
            </div>
            {systemToCheck ==="A"?   <div className={s.activity_info}>
                <table><thead><tr>
                    <th>Activity</th>
                    <th>Recorded</th></tr></thead>
                    <tbody>
                        <tr>
                            <td>{receiptData.jobRole ? receiptData.jobRole : null}</td>
                            <td>{receiptData.startTime ? formatDate(receiptData.startTime) : null} </td>
                        </tr>
                    </tbody></table>
                <div className={s.to_fill_up_container}>
                    <div className={s.to_fill_up}></div>
                    <br />
                    <div className={s.to_fill_up}></div>
                </div>

            </div> : null}
          
            <div className={s.footer}>
                <div className={s.signature}>
                   {systemToCheck === "A" ? <div>Signed: (Supplier)</div> : <div>Signed (Door Person)</div> } 
                    <div>_________________________________</div>
                    <div>Signed:(On behalf of pub)</div>
                    <div>_________________________________</div>
                </div>
                <div className={s.doc_info}>This document certifies that the above named person was in attendance at a JDW site on the indicated
                    date. It provides no proof of the hours worked which will be confirmed following authorisation by a JD
                    Wetherspoon Senior Manager.</div>
                <div className={s.ref_and_date}>
                    <div>Activity Reference: {receiptData.activityId ? receiptData.activityId : null}</div>
                    <div>{formatDate(new Date())}</div>
                </div>
            </div>
            </div>
        </div>
    )
}