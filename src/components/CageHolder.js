import React, { PureComponent } from 'react'
import Grey from "@material-ui/core/colors/grey"
import CageImage from "./CageImage"
import Coverflow from 'reactjs-coverflow'
import Button from "@material-ui/core/Button"
import { Paper } from '@material-ui/core';

const grey0 = Grey[100]
const grey200 = Grey[200]
const grey400 = Grey[400]
const grey600 = Grey[600]
const grey800 = Grey[800]

const defaultState = {

    shadesOfCage: [
        {
            color: grey0,
            clicked: false
        },
        {
            color: grey200,
            clicked: false
        },
        {
            color: grey400,
            clicked: false
        },
        {
            color: grey600,
            clicked: false
        },
        {
            color: grey800,
            clicked: false
        }
    ],
    score: 0,
    topscore: 0
}

class CageHolder extends PureComponent {

    // Using map assignment with fresh object assignments 
    // to prevent mutations of the state from changes the orginal defaultState
    state = {
        ...defaultState,
        shadesOfCage: defaultState.shadesOfCage.map(x => Object.assign({}, x))
    }

    // Using win boolean parameter to determine if need to set topscore to 5
    // This resolves a race condition between the previous async topscore setstate
    resetGame = win => {

        let topscore = this.state.topscore

        this.setState({
            ...defaultState,
            shadesOfCage: defaultState.shadesOfCage.map(x => Object.assign({}, x)),
            topscore: determineTopScore(win)
        })

        function determineTopScore(win) {

            if (win) {
                topscore = 5
            }
            return topscore
        }
    }

    randomize = () => {

        let randomShades = this.state.shadesOfCage.map(value => value)
        randomShades.sort(function (a, b) { return 0.5 - Math.random() });
        this.setState({ shadesOfCage: randomShades })
    }

    addPoint = () => {

        // This constant is used to prevent logic issues with the async nature of setState
        const addedPoint = this.state.score + 1

        this.setState({ score: addedPoint })

        if (this.state.topscore < addedPoint) {

            this.setState({ topscore: addedPoint })
        }

        if (addedPoint >= 5) {

            this.handleWin()
        } else {

            this.randomize()
        }
    }

    handleLose = () => {

        alert("You lost :(\nYou had already clicked that shade of Cage")
        this.resetGame()
    }

    handleWin = () => {

        alert("YOU WIN !!!\nYou successfully identified all 5 shades of Cage")
        this.resetGame(true)
    }

    prev = e => {
        e.preventDefault();
        this.refs.coverflow.previous();
    }

    next = e => {
        e.preventDefault();
        this.refs.coverflow.next();
    }

    handleCageClicked = shadeColor => {

        const shadeOfCageIndex = this.state.shadesOfCage.findIndex(shade => (shade.color === shadeColor))

        if (this.state.shadesOfCage[shadeOfCageIndex].clicked) {
            this.handleLose()
        } else {
            let updatedShadesOfCage = this.state.shadesOfCage.map(

                (shade, index) => {

                    if (index === shadeOfCageIndex) {

                        shade.clicked = true
                    }
                    return shade
                }
            )

            this.setState({
                shadesOfCage: updatedShadesOfCage
            })
            this.addPoint()
        }

    }

    render() {

        return (

            <Paper style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 640,
                padding: 10,
                margin: 5
            }}>
                <div style={{
                    width: "100%",
                    maxWidth: 600,
                    paddingLeft: 20,
                    paddingRight: 20
                }}>
                    <h1 style={{ textAlign: "center" }}>5 Shades of Cage</h1>
                    <p>To win click the 5 different shades of Cage.</p>
                    <p>After each click the position of each Cage will be randomized!</p>
                </div>
                <div style={{
                    justifyContent: "space-evenly",
                    display: "flex",
                    maxWidth: "600px",
                    width: "100%",
                }}>
                    <div>
                        <h2>Score: {this.state.score}</h2>
                    </div>
                    <div>
                        <h2>High score: {this.state.topscore}</h2>
                    </div>
                </div>
                <form>
                    <Coverflow ref="coverflow"
                        style={{
                            maxWidth: "600px",
                            width: "100%",
                            height: "300px",
                            perspective: "150px",
                            marginBottom: 20
                        }}
                        startPosition={2}
                        translateX={150}
                        rotation={5}

                    >
                        {this.state.shadesOfCage.map(shade =>
                            <CageImage shade={shade.color} key={shade.color} onClick={this.handleCageClicked} />
                        )}
                    </Coverflow>
                    <div style={{
                        justifyContent: "center",
                        display: "flex"
                    }}>
                        <Button onClick={this.prev} variant="raised" size="large" style={{ marginRight: 30 }}>Prev</Button>
                        <Button onClick={this.next} variant="raised" size="large">Next</Button>
                    </div>
                </form>
            </Paper>
        )
    }
}

export default CageHolder