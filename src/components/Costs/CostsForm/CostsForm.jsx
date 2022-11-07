import s from "./CostsForm.module.scss"

export const CostsForm = () => (
            <div className={s.container}>
                <form action="#">
                    <label htmlFor="">PERIOD</label>
                    <input type="date" name="search-date" id="search-date" />
                    <button>VIEW</button>
                </form>
            </div>
    );

