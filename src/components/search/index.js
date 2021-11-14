import { useHistory } from "react-router-dom";
import './search.css'

export default function Search(props){
    let history = useHistory();

    const handleSearchOnClick = (event) =>{
        history.push("/");
        props.hideNav();
    };

    return(
        <form id = "search-form" onClick = {handleSearchOnClick}>
            <input id = "search-form-input" type="text" placeholder="Search..." name="search" onChange={props.handleOnChange}/>
        </form>
    );
}