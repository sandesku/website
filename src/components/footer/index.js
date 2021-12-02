import {Link} from 'react-router-dom';
import "./footer.css";

export default function Footer() {

    return (
        <div id = "div-footer">
            <Link id = "footer-about" to = "about">About Me</Link>
            <Link id = "footer-contact" to = "contact">Contact Me</Link>
            <Link id = "footer-privacy" to = "privacy">Privacy Policy</Link>
            <p id = "footer-para">&copy; Copyright 2021-2022 www.sanku.com. All rights reserved. Developed by Sandesh Kumar.</p>
        </div>
    )
};