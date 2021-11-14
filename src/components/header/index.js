import {Link} from 'react-router-dom';
import Search from '../search'
import './header.css'

export default function Header(props){
    return (
        <div id="header-div">
            <button id="header-button" onClick = {props.slideNav}>☰</button>
            <Link id="header-link" to="/" onClick = {props.hideNav}>Website</Link>
            <div id="header-search">
                <Search handleOnChange = {props.handleOnChange} hideNav = {props.hideNav}></Search>
            </div>
        </div>
    )
}