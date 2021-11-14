import {Link} from 'react-router-dom';
import Search from '../search'
import './header.css'

export default function Header(props){
    return (
        <div id="header-div">
            <button id="header-button" onClick = {props.slideNav}>☰</button>
            <Link id="header-link" to="/" onClick = {props.handleOnClick}>Website</Link>
            <div id="header-search">
                <Search handleOnChange = {props.handleOnChange} handleOnClick = {props.handleOnClick}></Search>
            </div>
        </div>
    )
}