import React from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/Signin/Signin'
import Register from './components/Register/Register'
import 'tachyons'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import FaceRecognition from './components/FaceRecognition/FaceRecognition'
// import { object } from 'prop-types'


//                               //* !!! //*
// GENERAL_MODEL: 'aaa03c23b3724a16a56b629203edc62c',
// FOOD_MODEL: 'bd367be194cf45149e75f01d59f77ba7',
// TRAVEL_MODEL: 'eee28c313d69466f836ab83287a54ed9',
// NSFW_MODEL: 'e9576d86d2004ed1a38ba0cf39ecb4b1',
// WEDDINGS_MODEL: 'c386b7a870114f4a87477c0824499348',
// WEDDING_MODEL: 'c386b7a870114f4a87477c0824499348',
// COLOR_MODEL: 'eeed0b6733a644cea07cf4c60f87ebb7',
// CLUSTER_MODEL: 'cccbe437d6e54e2bb911c6aa292fb072',
// FACE_DETECT_MODEL: 'e15d0f873e66047e579f90cf82c9882z',
// LOGO_MODEL: 'c443119bf2ed4da98487520d01a0b1e3',
// DEMOGRAPHICS_MODEL: 'c0c0ac362b03416da06ab3fa36fb58e3',
// GENERAL_EMBED_MODEL: 'bbb5f41425b8468d9b7a554ff10f8581',
// FACE_EMBED_MODEL: 'd02b4508df58432fbb84e800597b8959',
// APPAREL_MODEL: 'e0be3b9d6a454f0493ac3a30784001ff',
// MODERATION_MODEL: 'd16f390eb32cad478c7ae150069bd2c6',
// TEXTURES_AND_PATTERNS: 'fbefb47f9fdb410e8ce14f24f54b47ff',
// LANDSCAPE_QUALITY: 'bec14810deb94c40a05f1f0eb3c91403',
// PORTRAIT_QUALITY: 'de9bd05cfdbf4534af151beb2a5d0953',
// CELEBRITY_MODEL: 'e466caa0619f444ab97497640cefc4dc'

const app = new Clarifai.App({
    apiKey: '34348b14b6a4458fa65801eeff785cc4 '
});

const particleOptions = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

// const particleOptions

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            input: '',
            imageUrl: '',
            box: [],
            route: 'SignIn',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    // https://wallpapercave.com/wp/wp2864827.jpg
    OnInputChange = (event) => {
        this.setState({ input: event.target.value })
    }

    // componentDidMount() {
    //     fetch('http://localhost:3001')
    //         .then(res => res.json())
    //         .then(console.log)
    // }

    calculateFaceLocation = (data) => {
        return data.outputs[0].data.regions.map(face => {
            const clarifaiFace = face.region_info.bounding_box
            const image = document.getElementById('inputimg')
            const width = Number(image.width)
            const height = Number(image.height)
            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomCol: height - (clarifaiFace.bottom_row * height)
            }
        })


    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }

    OnButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input })
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input) //* !!! //*
            .then(response => {
                if (response) {
                    fetch('https://infinite-dawn-00170.herokuapp.com/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(res => res.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }))
                        })
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err))
    }

    OnRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({ isSignedIn: false })
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route })
    }

    render() {
        const { isSignedIn, route, box, imageUrl } = this.state;
        return (
            <div className='App'>
                <Particles params={particleOptions} className='particles' />
                <Navigation isSignedIn={isSignedIn} OnRouteChange={this.OnRouteChange} />
                <div>
                    {this.state.route === 'home'
                        ? <div>
                            <Logo />
                            <Rank
                                name={this.state.user.name}
                                entries={this.state.user.entries}
                            />
                            <ImageLinkForm OnInputChange={this.OnInputChange} OnButtonSubmit={this.OnButtonSubmit} />
                            <FaceRecognition boxes={box} imageUrl={imageUrl} />
                        </div>
                        : (route === 'SignIn' ?
                            < SignIn loadUser={this.loadUser} OnRouteChange={this.OnRouteChange} />
                            :
                            < Register loadUser={this.loadUser} OnRouteChange={this.OnRouteChange} />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default App