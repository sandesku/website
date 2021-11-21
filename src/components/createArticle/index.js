import * as hostService from "../../services/hostService";
import { useHistory } from "react-router-dom";
import CreateArticleBody from "../createArticleBody";
import React from 'react';
import "./createArticle.css";

export default function CreateArticle() {
    let history = useHistory();

    const [article, setArticle] = React.useState({
        headline:"",
        overview:"",
        bodyList:[
            {
                title:"",
                content:"",
                statement:""
            }
        ],
        conclusion:""
    });

    const createArticle = async(body) =>{
        try{
          const response = await hostService.createArticle(body);
          history.push("/" + response.data.data);
        }catch (error) {
          console.error('ERROR', error);
        }
    }


    const handleOnBlur = (e) => {
        setArticle(values => ({...values, [e.target.name]: e.target.value}))
    }

    const handleArticleBodyOnBlur = (index, event) => {
        let bodyList = [...article.bodyList];
        bodyList[index][event.target.name] = event.target.value;
        //setArticle(values => ({...values, [bodyList]: bodyList}))
    }


    const handleAddOnClick = () => {
        setArticle(values => ({...values, bodyList:[...values.bodyList, {title: '',content: '',statement: ''}]}))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        createArticle(article);
    }

    return (
        <div id = "create-article">
            <form id = "create-article-form" onSubmit={handleOnSubmit}>
                <input id = "headline-input" placeholder="headline" type="text" name="headline" defaultValue={article.headline} onBlur={handleOnBlur} required/>
                <textarea id = "overview-input" placeholder="overview" rows="5" name="overview" form="create-article-form" defaultValue={article.overview} onBlur={handleOnBlur} required/>
                <label id = "article-body-label">Create Article Body</label>
                <input id = "add-button" type='button' value='+' onClick={handleAddOnClick}/>
                <CreateArticleBody bodyList = {article.bodyList} handleOnBlur = {handleArticleBodyOnBlur}></CreateArticleBody>
                <textarea id = "conclusion-input" placeholder="conclusion" rows="5" name="conclusion" form="create-article-form" defaultValue={article.conclusion} onBlur={handleOnBlur} required/>
                <input id = "submit-button" type="submit" value = 'create article'/>
            </form>
        </div>
    )
};