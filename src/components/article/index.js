import * as hostService from "../../services/hostService";
import { useParams } from 'react-router';
import ArticleBody from "../articleBody";
import React from "react";
import "./article.css";

export default function Article() {
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

    const getArticle = async(code) =>{
        try{
            const response = await hostService.getArticle(code);
            setArticle(response.data.data);
        }catch (error) {
            console.error('ERROR', error);
        }
    }

    React.useEffect(() => {
        getArticle(code);
        setIsLoading(false);
    }, [isLoading, code]);

    if(isLoading){
        return (<div>Loading...</div>)
    }

    return(
        <div id = "article-div">
            <h3 id = "headline">{article.headline}</h3>
            <p id = "overview">{article.overview}</p>
            <ArticleBody bodyList = {article.bodyList}></ArticleBody>
            <h4 id = "conclusion-header">Conclusion</h4>
            <p id = "conclusion-para">{article.conclusion}</p>
        </div>
    );
};