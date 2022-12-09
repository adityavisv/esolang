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
                    W-Esolang is a simple interpreter sandbox for <a href="https://www.esolangs.org">esoteric languages</a>. <br></br> For more context, refer to the linked wiki.<br/>
                    Source Code at <a href="https://gihtub.com/adityavisv/esolang">Github</a>. Supported languages:
                    
                    <ul>
                        <li>Brainfuck (debugger support included)</li>
                        <li>ABC (debugger <span className="bold">NOT</span> supported)</li>
                        <li>AlphaBeta (debugger <span className="bold">NOT</span> supported)</li>
                        <li>DeadSimple (debugger <span className="bold">NOT</span> supported)</li>
                        <li>11CORTLANG (debugger <span className="bold">NOT</span> supported)</li>
                    </ul>
                    
                    <h5>Notes</h5>
                    <ul>
                        <li>All the input instructions in each language are single character inputs, like the<br/>
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