import {Route, Switch } from 'react-router-dom';
import Article from "../article";
import Card from "../card";
import "./section.css";

export default function Section(props){

    return(
        <div id = "section-div">
            <Switch>
				<Route exact path='/'>
                    <Card data = {props.data} slideNav = {props.slideNav}></Card>
                </Route>
                <Route exact path='/:code'>
                    <Article></Article>
                </Route>
			</Switch>
        </div>
    )
}