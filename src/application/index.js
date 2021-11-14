import {BrowserRouter as Router} from 'react-router-dom';
import * as hostService from "../services/hostService"
import React from "react"
import Header from "../components/header";
import Nav from "../components/nav";
import Section from '../components/section';
import "./application.css";

export default function Application() {
    const [articleList, setArticleList] = React.useState([]);
    const [filteredArticleList, setFilteredArticleList] = React.useState(articleList);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const [navType, setNavType] = React.useState("nav");

    const getArticleList = async() =>{
        try{
            const response = await hostService.getArticleList();
            setArticleList(response.data.data);
            setFilteredArticleList(response.data.data);
        }catch (error) {
            console.error('ERROR', error);
            setIsError(true);
        }
    }

    React.useEffect(() => {
        getArticleList();
        setIsLoading(false);
    }, [isLoading]);

    const slideNav = () =>{
        if(window.innerWidth <= 1000){
            if(navType === "nav"){
                setNavType("slide");
            }else{
                setNavType("nav");
            }
        }
    };

    const hideNav = () =>{
        if(window.innerWidth <= 1000){
            setNavType("nav");
        }
    };

    const handleOnSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let filteredArticleList = articleList.filter((article) => {
            return article.headline.toLowerCase().search(value) !== -1;
        });
        setFilteredArticleList(filteredArticleList);
        hideNav();
    }

    if(isLoading){
        return (
            <div id = "div-loading">
                Loading...
            </div>
        );
    }

    if(isError){
        return (
            <div id = "div-error">
                Sorry for the Inconvienvce. We are facing downtime...
            </div>
        );
    }

    return(
        <Router>
            <nav id = {navType}>
                <Nav data = {articleList} slideNav = {slideNav}></Nav>
            </nav>
            <header id = "header">
                <Header handleOnChange = {handleOnSearch} slideNav = {slideNav} hideNav = {hideNav}></Header>
            </header>
            <section id = "section">
                <Section data = {filteredArticleList} hideNav = {hideNav}></Section>
            </section>
        </Router>
    )
}