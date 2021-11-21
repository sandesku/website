import React from 'react';
import "./articleBody.css";

export default function ArticleBody(props) {
    return props.bodyList.map((articleBody, index) => 
        <div key={index} className = "article-body">
            <h4 id = "title">{articleBody.title}</h4>
            <p id = "content">{articleBody.content}</p>
            <pre id = "statement">{articleBody.statement}</pre>
        </div>         
    )
}