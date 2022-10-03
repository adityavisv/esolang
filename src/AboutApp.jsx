import React from 'react';
import { CloseButton } from 'react-bootstrap';
import './aboutapp.css';

class AboutApp extends React.Component {
    render = () => {
        const {close} = this.props;
        return (
            <>
            <CloseButton onClick={close} id="close_btn"/>
            <div className="text">
                <h3>About</h3>
                    W-Esolang is a simple interpreter sandbox for <a href="https://www.esolangs.org">esoteric languages</a>. For more context, refer to the linked wiki.<br/>
                    Supported languages:
                    <ul>
                        <li>Brainfuck</li>
                    </ul>
                    <h5>Brainfuck</h5>
                    <ul>
                        <li>All characters outside the 8 defined commands are ignored entirely.</li>
                        <li>While the official language spec clarifies that the <code>,</code> command is to be treated like<br/>
                        <code>getchar()</code> from the C programming language; Here, all value inputs require a <code>&lt;Return&gt;</code> <br/>
                        for the user input to be registered.</li>
                        <li><b>BUG:</b> Explicitly feeding a CR/LF into <code>stdin</code> using <code>&lt;Return&gt;</code> is not supported.<br/>
                        So any program dealing with newline feeds in <code>stdin</code> won't run as expectex.
                        </li>
                    </ul>
            </div>
                
                
            </>
        )
    }
}

export default AboutApp;