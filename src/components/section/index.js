import {Route, Switch } from 'react-router-dom';
import About from '../../pages/about';
import Contact from '../../pages/contact';
import Article from "../article";
import Privacy from "../../pages/privacy"
import CreateArticle from '../createArticle';
import Card from "../card";
import "./section.css";
import Aside from '../aside';
import UpdateArticle from '../updateArticle';

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
                <Route exact path='/create'>
                    <CreateArticle></CreateArticle>
                </Route>
                <Route exact path='/update/:code'>
                    <UpdateArticle></UpdateArticle>
                </Route>
                <Route exact path='/:code'>
                    <Article></Article>
                    <Aside></Aside>
                </Route>
			</Switch>
        </div>
    )
}