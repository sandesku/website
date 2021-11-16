import {Link} from 'react-router-dom';
import './nav.css';

export default function Nav(props) {
    const navlist = props.data.map((article, index) =>
        <Link key = {index} className="nav-link" to={article.code} onClick = {props.slideNav}>{article.headline}</Link>
    )

    return (
        <div id = "nav-div">
            {navlist}
        </div>
    );
}