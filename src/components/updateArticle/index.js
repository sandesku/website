import * as hostService from "../../services/hostService";
import CreateArticleBody from "../createArticleBody";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';
import React from 'react';
import "./updateArticle.css";

export default function UpdateArticle() {
    let history = useHistory();
    let {code} = useParams();

    const [isLoading, setIsLoading] = React.useState(true);
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

    React.useEffect(() => {
        getArticle(code);
        setIsLoading(false);
    }, [isLoading, code]);

    const getArticle = async(code) =>{
        try{
            const response = await hostService.getArticle(code);
            setArticle(response.data.data);
        }catch (error) {
            console.error('ERROR', error);
        }
    }

    const updateArticle = async(body) =>{
        try{
          const response = await hostService.updateArticle(body);
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
        updateArticle(article);
    }

    if(isLoading){
        return (<div>Loading...</div>)
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
                <input id = "submit-button" type="submit" value = 'update article'/>
            </form>
        </div>
    )
};