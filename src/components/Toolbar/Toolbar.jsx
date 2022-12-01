
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';
import React from 'react';
import './toolbar.css';
import 'bootstrap/dist/css/bootstrap.css';
import InfoOverlay from '../InfoOverlay/InfoOverlay';
import AboutApp from '../AboutApp/AboutApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faPlayCircle, faUndo } from '@fortawesome/free-solid-svg-icons';
import Debugger from '../Debugger/Debugger';

class Toolbar extends React.Component {
    canDebug = () => {
        const { selectedLang, canExecute } = this.props;
        if (canExecute) {
            return selectedLang === 'Brainfuck';
        }
        return false;
    }

    render = () => {
        const { canExecute, handleClickRunBtn, handleClickDebugBtn, handleClickResetBtn, handleLanguageChange, brainfuckState, sourceCodeBuf, selectedLang } = this.props;
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
                            <Form.Select size="sm" onChange={handleLanguageChange} value={selectedLang}>
                                <option value="Brainfuck">Brainfuck</option>
                                <option value="11CORTLANG">11CORTLANG</option>
                                <option value="ABC">ABC</option>
                                <option value="DeadSimple">DeadSimple</option>
                                <option value="AlphaBeta">AlphaBeta</option>
                            </Form.Select>
                            
                            <div className="run_btn">
                                
                                <Button variant="outline-secondary" disabled={! this.canDebug()} onClick={handleClickDebugBtn}>
                                    <span><FontAwesomeIcon icon={faBug} size="sm" fixedWidth /></span>
                                </Button>
                            </div>
                            <div className="run_btn">
                                <Button 
                                    variant="outline-primary"
                                    onClick={handleClickRunBtn}
                                    disabled={!canExecute}
                                    id="runBtn">
                                        <div className="icon">
                                            <FontAwesomeIcon size="xs" icon={faPlayCircle} fixedWidth={true} />
                                           
                                        </div>
                                </Button>
                            </div>
                            <div className="reset_btn">
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleClickResetBtn}
                                    id="resetBtn"
                                    disabled={!canExecute}>
                                    <FontAwesomeIcon icon={faUndo} fixedWidth />
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