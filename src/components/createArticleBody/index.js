import React from 'react';
import "./createArticleBody.css";

export default function CreateArticleBody(props) {
    return props.articleBodyList.map((createArticleBody, index) => 
    <div key={index} className = "create-article-body">
        <input id = "title-input" placeholder="title" type="text" name="title" defaultValue={createArticleBody.title} onBlur={props.handleOnBlur.bind(this, index)} required/>
        <textarea id = "content-input" placeholder="content" rows="5" name="content" form="create-article-form" defaultValue={createArticleBody.content} onBlur={props.handleOnBlur.bind(this, index)} required/>
        <textarea id = "statement-textarea" placeholder="statement" rows="5" name="statement" form="create-article-form" defaultValue={createArticleBody.statement} onBlur={props.handleOnBlur.bind(this, index)} required/>
    </div>         
)
}