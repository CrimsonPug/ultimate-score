import React, { Component } from 'react';
import linked from './../../public/socialIcon/linked.svg';
import twitter from './../../public/socialIcon/twitter.svg';
import gitHub from './../../public/socialIcon/gitHub.svg';
import './../index.css';

class Footer extends Component {
    render(){
        return(
            <footer className="footer">
                <section >
                    <div className="social">
                        <ul className="footer-list social-list">
                            <li>
                                <a className="contact-link" href="https://linkedin.com/in/ikram-mustapha-b1210912a" target="_blank">
                                    <img className="icon-social" src={linked} />
                                </a>
                            </li>
                            <li>
                                <a className="contact-link" href="https://twitter.com/IkramTM" target="_blank">
                                    <img className="icon-social" src={twitter} />
                                </a>
                            </li>
                            <li>
                                <a className="contact-link" href="https://github.com/CrimsonPug" target="_blank">
                                    <img className="icon-social" src={gitHub} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <ul className="footer-list">
                        <li>
                            <a className="contact-link" href="https://github.com/CrimsonPug/ultimate-score" target="_blank">
                                GitHub Repo
                            </a>
                        </li>
                        <li className="divider">.</li>
                        <li>
                            <a className="contact-link" href="mailto:ikram.tuan.mustapha@gmail.com?Subject=Awesome%20project!" target="_top" target="_blank">
                                Made by Ikram Mustapha
                            </a>
                        </li>
                    </ul>
                </section>
            </footer>
        )
    }
}

export {Footer};