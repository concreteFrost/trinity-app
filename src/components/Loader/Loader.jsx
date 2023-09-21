import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";

function Loader() {
    const loaderReducer = useSelector((state) => state.loaderReducer);
    console.log(loaderReducer)
    return (<>
        {loaderReducer.isLoading ? <div className="tail_spin_container">
            <div className="tail_spin">
                <TailSpin width={150} height={150} color={"#42aaf5"}></TailSpin>
            </div>{" "}
        </div> : null}
    </>)
}

export default Loader;