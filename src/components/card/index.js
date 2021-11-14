import {Link} from 'react-router-dom';
import "./card.css"

export default function Card(props){

    const cardlist = props.data.map((article, index) =>
        <Link className="card-link" to={article.code} onClick = {props.hideNav}>
            <h4>{article.headline}</h4>
            <p>{article.overview}</p>
        </Link>
    )

    if(props.data && props.data.length) {
        return (
            <div id = "card-div">
                {cardlist}
            </div>
        )
    }else{
        return <h1>No Match Found</h1>
    }

}