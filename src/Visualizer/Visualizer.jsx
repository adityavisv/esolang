import React from 'react';

class Visualizer extends React.Component {

    constructor(props) {
        super(props);
        const bfTapeSlice = this.props.bfTape.slice(0,20);
        this.state = {
            bfTape: bfTapeSlice
        }
    }

    textToRender = () => {
        const { bfTape } = this.state;
        var startX = 0;
        const jsxRender = (<div>
            {
                Array.from(bfTape).map((element, index) => (
                    <text key={startX*index} x={startX * index} y={50}>{element}</text>
                ))
            }
            </div>);
        return jsxRender;
    }

    render = () => {
        const { bfTape } = this.state;
        return (
            <div>
                <svg viewBox="0 0 500 1000">
                    <rect x="0" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="25" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="50" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="75" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="100" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="125" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="150" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="175" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="200" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="225" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="250" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="275" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="300" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="325" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="350" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="375" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="400" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="425" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="450" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    <rect x="475" y="0" width="25" height="25" stroke="black" fill="transparent" strokeWidth="2" />
                    {
                        Array.from(bfTape).map((element, index) => (
                            <text fontSize="10" x={(7 + (25 * index))} y={50}>{element}</text>
                        ))
                    }
                </svg>
            </div>
        )
    }
}

export default Visualizer;