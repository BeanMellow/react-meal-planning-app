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
                    <i className="fas fa-chevron-left" onClick={this.handleClick('left')}></i>
                    {result}
                    <i className="fas fa-chevron-right" onClick={this.handleClick('right')}></i>
                </div>
            </div>
        );
    }
}

const CallToAction = () => (
    <div className={'callToAction'}>
        <div className={'container'}>
            <div>
                <h3>Lorem ipsum dolor sit amet</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At magni provident quae saepe similique velit! Obcaecati possimus quo rerum soluta.</p>
            </div>
            <button>Lorem ipsum</button>
        </div>
    </div>
);

const LandingPage = () => (
    <div className={'main'}>
        <Header/>
        <Slider/>
        <CallToAction/>
    </div>
);

export default LandingPage;