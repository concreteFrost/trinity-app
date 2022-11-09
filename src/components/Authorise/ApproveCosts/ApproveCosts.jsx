import s from "./ApproveCosts.module.scss"

export const ApproveCosts = () => (
        <div className={s.container}>
                <header><h2>Approve Costs</h2></header>
                <div className={s.locations_select}>
                        <label htmlFor="select-doorstaff">LOCATIONS</label>
                        <select name="select-doorstaff" id="selecet-doorstaff">
                                <option value="all">All Locations</option>
                        </select>
                </div>
                <table>
                        <thead>
                                <tr>
                                        <th>TIME</th>
                                        <th>PUB</th>
                                        <th>SUPPLIER</th>
                                        <th>ANALYSIS</th>
                                        <th>COST</th>
                                        <th>NOTES</th>
                                        <th>SELECT</th>

                                </tr>
                        </thead>
                        <tbody>
                                <tr>
                                        <td>12/08/2022 17:00:00</td>
                                        <td>Pub 6486</td>
                                        <td>COUNY CONTRACT CLEANING SERVICE LTD</td>
                                        <td>Windows</td>
                                        <td>120.00</td>
                                        <td><button>VIEW</button></td>
                                        <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                                </tr>
                                <tr>
                                        <td>12/08/2022 17:00:00</td>
                                        <td>Pub 6486</td>
                                        <td>COUNY CONTRACT CLEANING SERVICE LTD</td>
                                        <td>Windows</td>
                                        <td>120.00</td>
                                        <td><button>VIEW</button></td>
                                        <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                                </tr>
                                <tr>
                                        <td>12/08/2022 17:00:00</td>
                                        <td>Pub 6486</td>
                                        <td>COUNY CONTRACT CLEANING SERVICE LTD</td>
                                        <td>Windows</td>
                                        <td>120.00</td>
                                        <td><button>VIEW</button></td>
                                        <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                                </tr>
                                <tr>
                                        <td>12/08/2022 17:00:00</td>
                                        <td>Pub 6486</td>
                                        <td>COUNY CONTRACT CLEANING SERVICE LTD</td>
                                        <td>Windows</td>
                                        <td>120.00</td>
                                        <td><button>VIEW</button></td>
                                        <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                                </tr>
                                <tr>
                                        <td>12/08/2022 17:00:00</td>
                                        <td>Pub 6486</td>
                                        <td>COUNY CONTRACT CLEANING SERVICE LTD</td>
                                        <td>Windows</td>
                                        <td>120.00</td>
                                        <td><button>VIEW</button></td>
                                        <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                                </tr>
                        </tbody>
                </table>
                <div>
                        <ul>
                                <li><button>NONE</button></li>
                                <li><button>SELECT ALL</button></li>
                                <li><button>DISPUTE</button></li>
                                <li><button>APPROVE</button> </li>
                        </ul>
                </div>
        </div>
);

