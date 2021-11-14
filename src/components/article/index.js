import * as hostService from "../../services/hostService";
import { useParams } from 'react-router';
import React from "react";
import "./article.css";

export default function Article() {
    let {code} = useParams();

    const [article, setArticle] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

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
        <div>
            <h1>{article.headline}</h1>
        </div>
    );
};