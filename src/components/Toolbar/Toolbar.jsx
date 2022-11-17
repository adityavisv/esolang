
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';
import React from 'react';
import './toolbar.css';
import 'bootstrap/dist/css/bootstrap.css';
import InfoOverlay from '../InfoOverlay/InfoOverlay';
import AboutApp from '../AboutApp/AboutApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import Debugger from '../Debugger/Debugger';

class Toolbar extends React.Component {
    render = () => {
        const { canExecute, handleClickRunBtn, handleClickResetBtn, handleLanguageChange, brainfuckState, sourceCodeBuf } = this.props;
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>W-Esolang</Navbar.Brand>
                    <Navbar.Toggle />
                    <Nav className="mne-auto">
                        <InfoOverlay
                            render={({ close, labelId, descriptionId }) => (
                                <>
                                    <AboutApp close={close} />
                                </>
                            )}
                        >
                            <Button variant="outline-info">About</Button>
                        </InfoOverlay>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Form className="d-flex">
                            <Form.Select size="sm" onChange={handleLanguageChange}>
                                <option>Brainfuck</option>
                                <option>11CORTLANG</option>
                                <option>ABC</option>
                                <option>DeadSimple</option>
                            </Form.Select>
                            {/* <div className="run_btn">
                                <InfoOverlay
                                        render={({ close, labelId, descriptionId }) => (
                                        <div className="canvas">
                                            <Visualizer bfTape={bfTape} close={close} />
                                        </div>
                                    )}
                                >
                                    <Button variant="outline-secondary">
                                        Visualize
                                    </Button>
                                </InfoOverlay>
                            </div> */}
                            <div className="run_btn">
                                <InfoOverlay
                                    render={({ close, labelId, descriptionId }) => (
                                        <div className="canvas">
                                            <Debugger
                                                sourceCodeBuf={sourceCodeBuf}
                                                brainfuckState={brainfuckState}
                                            />
                                        </div>
                                    )}
                                    >
                                        <Button variant="outline-secondary" disabled={!canExecute}>
                                            Debug
                                        </Button>
                                    </InfoOverlay>
                            </div>
                            <div className="run_btn">
                                <Button 
                                    variant="outline-primary"
                                    onClick={handleClickRunBtn}
                                    disabled={!canExecute}
                                    id="runBtn">
                                        <div className="icon">
                                            {/* <FontAwesomeIcon size="xs" icon={faPlayCircle} fixedWidth={true} /> */}
                                            Run
                                        </div>
                                </Button>
                            </div>
                            <div className="reset_btn">
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleClickResetBtn}
                                    id="resetBtn"
                                    disabled={!canExecute}>
                                    Reset
                            </Button>
                            </div>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Toolbar;