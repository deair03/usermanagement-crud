import { useRouteError } from "react-router-dom";

function Error(){
    const err = useRouteError();
    return(
        <div>
            <h1>Oops!! Something Went Wrong</h1>
            <h3>{err.status}: {err.status.Text}</h3>
        </div>
    )
}

export default Error;