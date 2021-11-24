import * as hostService from "../../services/hostService";
import CreateArticleBody from "../createArticleBody";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';
import Exception from "../exception";
import Login from "../login";
import React from 'react';
import "./updateArticle.css";

export default function UpdateArticle() {
    let history = useHistory();
    let {code} = useParams();

    const [exception, setException] = React.useState('');
    const [user, setUser] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
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

    React.useEffect(() => {
        if(isLoading){
            getArticle(code);
            setIsLoading(false);
        }
    }, [isLoading, code]);

    const getArticle = async(code) =>{
        try{
            const response = await hostService.getArticle(code);
            if(response.data.code){
                setException(response.data.message);
              }else{
                setArticle(response.data.data);
              }
        }catch (error) {
            console.error('ERROR', error);
        }
    }

    const updateArticle = async(user, article) =>{
        try{
          const response = await hostService.updateArticle(user, article);
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
        setArticle(values => ({...values, bodyList:[...values.bodyList, {title: '',content: '',statement: ''}]}))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateArticle(user, article);
    }

    if(isLoading){
        return (<div>Loading...</div>)
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
                <input id = "submit-button" type="submit" value = 'update article'/>
            </form>
        </div>
    )
};