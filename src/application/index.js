import {BrowserRouter as Router} from 'react-router-dom';
import * as hostService from "../services/hostService"
import Header from "../components/header";
import Nav from "../components/nav";
import Section from '../components/section';
import Footer from '../components/footer';
import Exception from "../components/exception"
import React from "react"
import "./application.css";

export default function Application() {
    const [articleList, setArticleList] = React.useState([]);
    const [filteredArticleList, setFilteredArticleList] = React.useState(articleList);
    const [isLoading, setIsLoading] = React.useState(true);
    const [exception, setException] = React.useState('');
    const [navType, setNavType] = React.useState("nav");

    React.useEffect(() => {
        if(isLoading){
            getArticleList();
            setIsLoading(false);
        }
    }, [isLoading]);

    const getArticleList = async() =>{
        try{
            const response = await hostService.getArticleList();
            if(response.data.code===0){
                setArticleList(response.data.data);
                setFilteredArticleList(response.data.data);
            }else{
                setException(response.data.message);
            }
        }catch (error) {
            console.error('ERROR', error);
        }
    }

    const handleOnSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let filteredArticleList = articleList.filter((article) => {
            return article.headline.toLowerCase().search(value) !== -1;
        });
        setFilteredArticleList(filteredArticleList);
    }

    const handleOnClick = () => {
        setFilteredArticleList(articleList);
        if(window.innerWidth <= 1000){
            setNavType("nav");
        }
    }

    const slideNav = () =>{
        if(window.innerWidth <= 1000){
            if(navType === "nav"){
                setNavType("slide");
            }else{
                setNavType("nav");
            }
        }
    };

    if(exception){
        return(<Exception message = {exception} setException = {setException}></Exception>);
    }

    if(isLoading){
        return (<div id = "div-loading">Loading...</div>);
    }

    return(
        <Router>
            <nav id = {navType}>
                <Nav data = {articleList} slideNav = {slideNav}></Nav>
            </nav>
            <header id = "header">
                <Header handleOnChange = {handleOnSearch} slideNav = {slideNav} handleOnClick = {handleOnClick}></Header>
            </header>
            <section id = "section">
                <Section data = {filteredArticleList} handleOnClick = {handleOnClick}></Section>
            </section>
            <footer id = "footer">
                <Footer></Footer>
            </footer>
        </Router>
    )
}