import s from "./Authorise.module.scss"
import { CostsAndPayments } from "./CostsAndPayments/CostsAndPayments";
import { SwitchView } from "../Shared/SwitchView/SwitchView";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ViewAreaDisputedNote } from "../../redux/api/disputedApi";


export const Authorise = () => {

    const [view, setView] = useState('doorstaff');
    const [_type, setType] = useState('costs');
    function DefineView(target) {
        setView(target)
    }

    const doorstaff = useSelector(state => state.authoriseReducer.doorstaff);
    const token = useSelector(state => state.userReducer.user.access_token)
    const costs = useSelector(state => state.authoriseReducer.costs);
    const dispatch = useDispatch();

    function handleCheck(e, actions, id) {
        dispatch({ type: actions, data: { id: parseInt(id), selected: e.target.checked } })

    }
    function viewNote(paymentAuthId, system, token) {
        dispatch(ViewAreaDisputedNote(token, system, paymentAuthId))
    }

    const tableHeaders = (system, checkMethod) => [{
        Header: "START",
        accessor: "start",
    },
    {
        Header: "FINISH",
        accessor: 'finish'
    },
    {
        Header: "PUB",
        accessor: "locationName"
    },
    {
        Header: "SUPPLIER",
        accessor: 'supplierName'
    },
    {

        Header: system === "S" ? "NAME" : "ANALYSIS",
        accessor: 'staffName'
    },

    {
        Header: "POSITION",
        accessor: 'jobRoleName'
    },
    {
        Header: "COST",
        accessor: "cost"
    },
    {
        Header: "NOTES",
        accessor: "note",
        Cell: ({ row }) => (
            <div>
                <button onClick={() => viewNote(row.original.paymentAuthId, system, token)}>NOTE</button>
            </div>

        )
    },
    {
        Header: "ACTIONS",
        accessor: "paymentAuthId",
        Cell: ({ row }) => (
            <div className={s.actions}>
                <div>
                    <input
                        type="checkbox"
                        name={row.original.activityId}
                        id={row.original.activityId}
                        onChange={(e) => { handleCheck(e, checkMethod, row.original.activityId) }}
                        checked={row.original.selected} />

                </div>
                <div>
                    <button onClick={() => {
                        dispatch({ type: "SHOW_MODAL_PROMPT" })
                        dispatch({ type: "SET_DISPUTED_PAYMENT_ID", data: row.original.paymentAuthId })
                    }}>DISPUTE</button>
                </div>
            </div>
        )
    },
    ]

    const tableHeaders2 = (system, checkMethod) => [{
        Header: "START",
        accessor: "start",
    },
    {
        Header: "FINISH",
        accessor: 'finish'
    },
    {
        Header: "PUB",
        accessor: "locationName"
    },
    {
        Header: "SUPPLIER",
        accessor: 'supplierName'
    },
    {

        Header: system === "S" ? "NAME" : "ANALYSIS",
        accessor: 'staffName'
    },
    {

        Header: "APPROVAL LEVEL",
        accessor: 'status'
    },

    {
        Header: "POSITION",
        accessor: 'jobRoleName'
    },
    {
        Header: "COST",
        accessor: "cost"
    },
    {
        Header: "NOTES",
        accessor: "note",
        Cell: ({ row }) => (
            <button onClick={() => viewNote(row.original.paymentAuthId, system, token)}>NOTE</button>
        )
    },
    {
        Header: "ACTIONS",
        accessor: "paymentAuthId",
        Cell: ({ row }) => (
            <div className={s.actions}>
                <div>
                    <input
                        type="checkbox"
                        name={row.original.activityId}
                        id={row.original.activityId}
                        onChange={(e) => { handleCheck(e, checkMethod, row.original.activityId) }}
                        checked={row.original.selected} />

                </div>
                <div>
                    <button onClick={() => {
                        dispatch({ type: "SHOW_MODAL_PROMPT" })
                        dispatch({ type: "SET_DISPUTED_PAYMENT_ID", data: row.original.paymentAuthId })
                    }}>DISPUTE</button>
                </div>
            </div>
        )
    },
    ]


    const costPaymentsHeaders = [
        'START',
        'FINISH',
        'PUB',
        'SUPPLIER',
        'ANALYSIS',
        'APPROVAL LEVEL',
        'POSITION',
        'COST',
        'NOTES',
        'SELECT']

    return (<div className={s.container}>
        <header><h1>AUTHORISE</h1>
            <SwitchView defineView={DefineView} inputs={['doorstaff', 'costs']} currentView={view} ></SwitchView>
        </header>

        <main>
            <div className={s.locations_select}>
                <label htmlFor="select-doorstaff">TYPE</label>
                <select name="select-doorstaff" id="selecet-doorstaff" onChange={
                    (e) => { setType(e.target.value) }
                }>
                    <option value="costs">Costs</option>
                    <option value="payments">Payments</option>
                </select>
            </div>
            <div className={s.table}>
                {view === "doorstaff" && _type === "costs" ? <CostsAndPayments data={doorstaff} system="S" tableHeaders={tableHeaders("S", "CHECK_AUTHORISE_DOORSTAFF")} container={s.container} title={"Doorstaff Costs"} /> : null}
                {view === "doorstaff" && _type === "payments" ? <CostsAndPayments data={doorstaff} system="S" tableHeaders={tableHeaders2("S", "CHECK_AUTHORISE_DOORSTAFF")} container={s.container} title={"Doorstaff Costs"} /> : null}
                {view === "costs" && _type === "costs" ? <CostsAndPayments data={costs} system="A" tableHeaders={tableHeaders("A", "CHECK_AUTHORISE_COSTS")} container={s.container} title={"Costs"} /> : null}
                {view === "costs" && _type === "payments" ? <CostsAndPayments data={costs} system="A" tableHeaders={tableHeaders2("A", "CHECK_AUTHORISE_COSTS")} container={s.container} title={"Payments"} /> : null}
            </div>
        </main>
    </div>)
}

