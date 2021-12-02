import * as hostService from "../../services/hostService";
import { useHistory } from "react-router-dom";
import CreateArticleBody from "../createArticleBody";
import Exception from "../exception";
import Login from "../login";
import React from 'react';
import "./createArticle.css";

export default function CreateArticle() {
    let history = useHistory();

    const [exception, setException] = React.useState('');
    const [user, setUser] = React.useState();
    const [article, setArticle] = React.useState({
        headline:"",
        overview:"",
        articleBodyList:[
            {
                title:"",
                content:"",
                statement:""
            }
        ],
        conclusion:""
    });

    const createArticle = async(article) =>{
        try{
          const response = await hostService.createArticle(article, user);
          if(response.data.code===0){
            history.push("/" + response.data.data);
          }else{
            setException(response.data.message);
          }
        }catch (error) {
          console.error('ERROR', error);
        }
    }


    const handleOnBlur = (e) => {
        setArticle(values => ({...values, [e.target.name]: e.target.value}))
    }

    const handleArticleBodyOnBlur = (index, event) => {
        let articleBodyList = [...article.articleBodyList];
        articleBodyList[index][event.target.name] = event.target.value;
    }


    const handleAddOnClick = () => {
        setArticle(values => ({...values, articleBodyList:[...values.articleBodyList, {title: '',content: '',statement: ''}]}))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        createArticle(article);
    }

    if(exception){
        return(<Exception message = {exception} setException = {setException}></Exception>);
    }

    if(!user){
        return(<Login setUser = {setUser}></Login>);
    }

    return (
        <div id = "create-article">
            <form id = "create-article-form" onSubmit={handleOnSubmit}>
                <input id = "headline-input" placeholder="headline" type="text" name="headline" defaultValue={article.headline} onBlur={handleOnBlur} required/>
                <textarea id = "overview-input" placeholder="overview" rows="5" name="overview" form="create-article-form" defaultValue={article.overview} onBlur={handleOnBlur} required/>
                <label id = "article-body-label">Create Article Body</label>
                <input id = "add-button" type='button' value='+' onClick={handleAddOnClick}/>
                <CreateArticleBody articleBodyList = {article.articleBodyList} handleOnBlur = {handleArticleBodyOnBlur}></CreateArticleBody>
                <textarea id = "conclusion-input" placeholder="conclusion" rows="5" name="conclusion" form="create-article-form" defaultValue={article.conclusion} onBlur={handleOnBlur} required/>
                <input id = "submit-button" type="submit" value = 'create article'/>
            </form>
        </div>
    )
};