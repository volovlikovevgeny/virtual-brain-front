import React from 'react'

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            SignInEmail: '',
            SignInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ SignInEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ SignInPassword: event.target.value })
    }
    onSubmitSignIn = () => {
        fetch('https://infinite-dawn-00170.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.SignInEmail,
                password: this.state.SignInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.OnRouteChange('home')
                }
            })
    }
    render() {
        const { OnRouteChange } = this.props
        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5  center" >
                <main className="pa4 black-80">
                    <div className='measure'>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Авторизация</legend>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="text">Почта</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Пароль</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Авторизоваться" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => OnRouteChange('register')} className="f6 link dim black db pointer">Регистрация</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}
export default Signin