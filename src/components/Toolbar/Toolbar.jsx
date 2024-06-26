
import { Navbar, Nav, Container,  Button, Form } from 'react-bootstrap';
import React from 'react';
import './toolbar.css';
import 'bootstrap/dist/css/bootstrap.css';
import InfoOverlay from '../InfoOverlay/InfoOverlay';
import AboutApp from '../AboutApp/AboutApp';

class Toolbar extends React.Component {
    render = () => {
        const {canExecute, handleClickRunBtn, handleClickResetBtn, handleLanguageChange} = this.props;
        return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>W-Esolang</Navbar.Brand>
                <Navbar.Toggle/>
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
                        </Form.Select>
                        <div className="run_btn">
                            <Button variant="outline-primary"
                                onClick={handleClickRunBtn}
                                disabled={!canExecute}
                                id="runBtn">
                                    Run
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