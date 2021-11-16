import {Route, Switch } from 'react-router-dom';
import About from '../../pages/about';
import Contact from '../../pages/contact';
import Article from "../article";
import Privacy from "../../pages/privacy"
import Card from "../card";
import "./section.css";

export default function Section(props){

    return(
        <div id = "section-div">
            <Switch>
				<Route exact path='/'>
                    <Card data = {props.data} handleOnClick = {props.handleOnClick}></Card>
                </Route>
                <Route exact path='/about'>
                    <About></About>
                </Route>
                <Route exact path='/contact'>
                    <Contact></Contact>
                </Route>
                <Route exact path='/privacy'>
                    <Privacy></Privacy>
                </Route>
                <Route exact path='/:code'>
                    <Article></Article>
                </Route>
			</Switch>
        </div>
    )
}