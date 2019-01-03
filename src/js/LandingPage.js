import React from 'react';

const Header = () => (
    <div className={'header'}>
        <div className={'container'}>
            <h1 className={'logo'}>
                Zaplanuj <span>Jedzonko</span>
            </h1>
            <nav>
                <ul>
                    <li>ZAPLANUJ POSIŁKI</li>
                    <li>DLACZEGO WARTO?</li>
                    <li>O MNIE</li>
                    <li>KONTAKT</li>
                </ul>
            </nav>
        </div>
    </div>
);

class Slider extends React.Component {
    state = {
        activeSlide: 0
    };

    handleClick = leftOrRight => () => {
        let nextSlide = this.state.activeSlide;
        if (leftOrRight === 'left') {
            nextSlide > 0 ? nextSlide-- : nextSlide = 2;
            this.setState({
                activeSlide: nextSlide
            });
        } else if (leftOrRight === 'right') {
            nextSlide < 2 ? nextSlide++ : nextSlide = 0;
            this.setState({
                activeSlide: nextSlide
            });
        }
    };

    render() {
        let result;
        switch (this.state.activeSlide) {
            case 0:
                result = (
                    <div>
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, quia!</p>
                    </div>
                );
                break;
            case 1:
                result = (
                    <div>
                        <h2>Duis aute irure occaecat</h2>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do.</p>
                    </div>
                );
                break;
            case 2:
                result = (
                    <div>
                        <h2>Consectetur adipiscing elit, sed</h2>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
                    </div>
                );
                break;
        }

        return (
            <div className={'slider'}>
                <div className={'container'}>
                    <i className="fas fa-chevron-left" onClick={this.handleClick('left')}> </i>
                    {result}
                    <i className="fas fa-chevron-right" onClick={this.handleClick('right')}> </i>
                </div>
            </div>
        );
    }
}

const CallToAction = () => (
    <div className={'callToAction'}>
        <div className={'container'}>
            <div>
                <h2>Zaplanuj każdy posiłek</h2>
                <p>Planowanie posiłków nigdy nie było takie proste, kliknij przycisk i przekonaj się!</p>
            </div>
            <span className={'btn'}>ZACZYNAM!</span>
        </div>
    </div>
);

const AboutApp = () => {
    const icons = ['fas fa-check fa-3x', 'far fa-clock fa-3x', 'fas fa-list fa-3x'];

    return (
        <div className={'container aboutApp'}>
            {icons.map(icon => (
                <div key={icon}>
                    <i className={icon}> </i>
                    <h2>Lorem ipsum dolor sit amet</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat
                        volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.</p>
                </div>
            ))}
        </div>
    );
};

class NewsletterForm extends React.Component {
    state = {
        email: ''
    };

    handleChange = event => {
        this.setState({email: event.target.value});
    };

    render() {
        return (
            <div className={'newsletter'}>
                <div className={'container'}>
                    <h2>Lorem ipsum dolor sit amet</h2>
                    <form>
                        <input onChange={this.handleChange} type='email'/>
                        <button className={'btn'} type={'submit'}>Lorem</button>
                    </form>
                </div>
            </div>
        );
    }
}

const AboutAuthor = () => (
    <div className={'aboutAuthor container'}>
        <div className={'pic'}> </div>
        <div>
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat.
                Donec placerat nisl magna, et faucibus arcu condimentum sed. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus
                arcu condimentum sed.</p>
        </div>
    </div>
);

class Footer extends React.Component {
    state = {
        input: ''
    };

    handleChange = event => {
        this.setState({email: event.target.value});
    };

    render() {
        const icons = ['fab fa-facebook-square fa-2x', 'fab fa-twitter-square fa-2x', 'fab fa-instagram fa-2x'];

        return (
            <footer>
                <div className={'container'}>
                    <div>
                        <div>
                            <h2>Lorem ipsum dolor</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat
                                volutpat. Donec placerat nisl magna.</p>
                        </div>
                        <div>
                            <h2>Lorem ipsum dolor</h2>
                            <ul>
                                <li>consectetur adipiscing elit</li>
                                <li>sed do eiusmod tempor</li>
                                <li>incididunt ut labore</li>
                                <li>et dolore magna aliqua</li>
                            </ul>
                        </div>
                        <div>
                            <h2>Lorem ipsum dolor</h2>
                            <form>
                                <input onChange={this.handleChange} type='email'/>
                                <button className={'btn'} type={'submit'}>Lorem</button>
                            </form>
                            <div className={'socialMedia'}>
                                {icons.map(icon => (
                                    <i key={icon} className={icon}> </i>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='copyright'>Copyright <span>ZaplanujJedzonko.pl</span></div>
            </footer>
        );
    }
}

const LandingPage = () => (
    <div className={'main'}>
        <Header/>
        <Slider/>
        <CallToAction/>
        <AboutApp/>
        <NewsletterForm/>
        <AboutAuthor/>
        <Footer/>
    </div>
);

export default LandingPage;