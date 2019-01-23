import React from "react";
import FirstVisit from "./FirstVisit";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import {NavLink} from "react-router-dom";
import {db} from "./firebase";

class Widgets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfRecipes: '',
            info: true,
            alert: true,
            success: true,
        }

    }

    getDataFromDb = category => {
        const result = [];

        db.collection(category).get().then(recipes => {
            recipes.forEach(recipe => {
                result.push(recipe);
            });
            this.setState({
                numberOfRecipes: result.length
            })
        }).catch(error => console.log('Error getting data: ' + error));

    };

    handleDelete = widgetType => () => {
        this.setState({
            [widgetType]: false,
        });

    };

    render() {
        let widgetInfo = null;
        let widgetAlert = null;
        let widgetSuccess = null;
        if (this.state.info === true) {
            widgetInfo = (
                <div onClick={this.handleDelete('info')}>
                    <i className="fas fa-info-circle">
                        <h3>You've got {this.state.numberOfRecipes} recipes, nice!</h3>
                    </i>
                    <i className="fas fa-times-circle"> </i>
                </div>
            )
        }

        if (this.state.alert === true) {
            widgetAlert = (
                <div onClick={this.handleDelete('alert')}>
                    <i className="fas fa-exclamation-circle">
                        <h3>Remember to keep plans up to date!</h3>
                    </i>
                    <i className="fas fa-times-circle"> </i>
                </div>
            )
        }

        if (this.state.success === true) {
            widgetSuccess = (
                <div onClick={this.handleDelete('success')} style={{}}>
                    <i className="fas fa-check-circle">
                        <h3>Great to see you here! Enjoy planning and delicious meals! :)</h3>
                    </i>
                    <i className="fas fa-times-circle"> </i>
                </div>
            )
        }
        return (
            <div className={"widgetsContainer"}>
                <div>
                    <NavLink to="/AddRecipe" style={{textDecoration: 'none', width: '45%'}}>
                        <div className={"widgetAdd"}>
                            <i className="far fa-plus-square fa-4x"> </i>
                            <h3>add recipe</h3>
                        </div>
                    </NavLink>

                    <NavLink to="/AddSchedule" style={{textDecoration: 'none', width: '45%'}}>
                        <div className={"widgetAdd"}>
                            <i className="far fa-plus-square fa-4x"> </i>
                            <h3>add plan</h3>
                        </div>
                    </NavLink>
                </div>
                <div className={"widgetsInfo"}>
                    {widgetInfo}
                    {widgetAlert}
                    {widgetSuccess}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getDataFromDb('Recipes')
    }
}

const PulpitTableHead = () => (
    <thead>
    <tr>
        <th>MONDAY</th>
        <th>TUESDAY</th>
        <th>WEDNESDAY</th>
        <th>THURSDAY</th>
        <th>FRIDAY</th>
        <th>SATURDAY</th>
        <th>SUNDAY</th>
    </tr>
    </thead>
);

class PulpitTable extends React.Component {
    constructor(props) {
        super(props);

        const result = this.props.thisWeek;

        this.state = {
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {},
            saturday: {},
            sunday: {},
            thisWeek: result,
            isReady: true
        }
    }

    getDataFromDb = () => {
        const weekNumber = this.state.thisWeek;

        db.collection('Schedules').doc(weekNumber + "week").get().then(schedule => {
            const monday = schedule.data().scheduleRec.monday;
            const tuesday = schedule.data().scheduleRec.tuesday;
            const wednesday = schedule.data().scheduleRec.wednesday;
            const thursday = schedule.data().scheduleRec.thursday;
            const friday = schedule.data().scheduleRec.friday;
            const saturday = schedule.data().scheduleRec.saturday;
            const sunday = schedule.data().scheduleRec.sunday;

            this.setState({
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday,
                isReady: true
            });
        }).catch(error => console.log('Error getting data: ' + error));

    };

    refreshData = (date) => {
        const weekNumber = date;

        db.collection('Schedules').doc(weekNumber + "week").get().then(schedule => {

            if (schedule.data() !== undefined) {

                const monday = schedule.data().scheduleRec.monday;
                const tuesday = schedule.data().scheduleRec.tuesday;
                const wednesday = schedule.data().scheduleRec.wednesday;
                const thursday = schedule.data().scheduleRec.thursday;
                const friday = schedule.data().scheduleRec.friday;
                const saturday = schedule.data().scheduleRec.saturday;
                const sunday = schedule.data().scheduleRec.sunday;

                this.setState({
                    monday: monday,
                    tuesday: tuesday,
                    wednesday: wednesday,
                    thursday: thursday,
                    friday: friday,
                    saturday: saturday,
                    sunday: sunday,
                    isReady: true
                });
            } else {
                this.setState({
                    isReady: undefined
                })
            }
        }).catch(error => console.log('Error getting data: ' + error));
    };

    render() {
        console.log(this.state.isReady);
        if (this.state.isReady === true) {
            return (
                <div className={'desktopView'}>
                    <table className={'pulpitTable'}>
                        <PulpitTableHead/>
                        <tbody>
                        <tr>
                            <td>
                                {this.state.monday.breakfest}
                            </td>
                            <td>
                                {this.state.tuesday.breakfest}
                            </td>
                            <td>
                                {this.state.wednesday.breakfest}
                            </td>
                            <td>
                                {this.state.thursday.breakfest}
                            </td>
                            <td>
                                {this.state.friday.breakfest}
                            </td>
                            <td>
                                {this.state.saturday.breakfest}
                            </td>
                            <td>
                                {this.state.sunday.breakfest}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.state.monday.lunch}
                            </td>
                            <td>
                                {this.state.tuesday.lunch}
                            </td>
                            <td>
                                {this.state.wednesday.lunch}
                            </td>
                            <td>
                                {this.state.thursday.lunch}
                            </td>
                            <td>
                                {this.state.friday.lunch}
                            </td>
                            <td>
                                {this.state.saturday.lunch}
                            </td>
                            <td>
                                {this.state.sunday.lunch}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.state.monday.soup}
                            </td>
                            <td>
                                {this.state.tuesday.soup}
                            </td>
                            <td>
                                {this.state.wednesday.soup}
                            </td>
                            <td>
                                {this.state.thursday.soup}
                            </td>
                            <td>
                                {this.state.friday.soup}
                            </td>
                            <td>
                                {this.state.saturday.soup}
                            </td>
                            <td>
                                {this.state.sunday.soup}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.state.monday.dinner}
                            </td>
                            <td>
                                {this.state.tuesday.dinner}
                            </td>
                            <td>
                                {this.state.wednesday.dinner}
                            </td>
                            <td>
                                {this.state.thursday.dinner}
                            </td>
                            <td>
                                {this.state.friday.dinner}
                            </td>
                            <td>
                                {this.state.saturday.dinner}
                            </td>
                            <td>
                                {this.state.sunday.dinner}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.state.monday.desert}
                            </td>
                            <td>
                                {this.state.tuesday.desert}
                            </td>
                            <td>
                                {this.state.wednesday.desert}
                            </td>
                            <td>
                                {this.state.thursday.desert}
                            </td>
                            <td>
                                {this.state.friday.desert}
                            </td>
                            <td>
                                {this.state.saturday.desert}
                            </td>
                            <td>
                                {this.state.sunday.desert}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.state.monday.supper}
                            </td>
                            <td>
                                {this.state.tuesday.supper}
                            </td>
                            <td>
                                {this.state.wednesday.supper}
                            </td>
                            <td>
                                {this.state.thursday.supper}
                            </td>
                            <td>
                                {this.state.friday.supper}
                            </td>
                            <td>
                                {this.state.saturday.supper}
                            </td>
                            <td>
                                {this.state.sunday.supper}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else if (this.state.isReady === undefined) {
            //Nie dodano planu na ten tydzień. Kliknij w "Dodaj plan" aby uzupełnić przepisy
            return (
                <h3>No plan set for this week. Click "Add plan" above and fill in recipes.</h3>
            );
        } else {
            return (
                <table className={'pulpitTable'}>
                    <tbody>
                    <tr>
                        <td>
                            Loading plan
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            thisWeek: props.thisWeek
        });
        this.refreshData(props.thisWeek);
    }

    componentDidMount() {
        this.getDataFromDb('Schedules');
    }
}

class ScheduleWeek extends React.Component {
    constructor(props) {
        super(props);

        function getWeekNumber(d) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
            let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        }

        const result = getWeekNumber(new Date());
        this.state = {
            week: result,
            currentWeek: result,
            false: true
        }
    }

    handleClick = side => () => {

        let actualWeek = this.state.week;
        if (side === 'previous') {
            actualWeek < 2 ? actualWeek = 52 : --actualWeek;
        } else if (side === 'next') {
            actualWeek > 51 ? actualWeek = 1 : ++actualWeek;
        }
        this.setState({
            week: actualWeek,
            false: false
        });
    };

    render() {
        let result;
        let suffix;
        switch (this.state.week) {
            case 1:
            case 21:
            case 31:
            case 41:
            case 51:
                suffix = 'st';
                break;
            case 2:
            case 22:
            case 32:
            case 42:
            case 52:
                suffix = 'nd';
                break;
            case 3:
            case 23:
            case 33:
            case 43:
                suffix = 'rd';
                break;
            default:
                suffix = 'th';
        }
        if (this.state.week === this.state.currentWeek) {
            result = <h2>Your plan for current week ({this.state.week}{suffix} of 52):</h2>
        } else {
            result = <h2>Your plan for {this.state.week}{suffix} week:</h2>
        }

        return (
            <div className={"scheduleContainer"}>
                {result}
                <div>
                    <PulpitTable thisWeek={this.state.week} false={this.state.false}/>
                </div>
                <div>
                    <h3 onClick={this.handleClick('previous')}>Previous</h3>
                    <h3 onClick={this.handleClick('next')}>Next</h3>
                </div>
            </div>
        )
    }
}

class Pulpit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeName: false
        }
    }

    changeView = () => {
        this.setState({
            changeName: true
        });
    };

    render() {

        if (localStorage.getItem("givenName") === null) {
            return <FirstVisit nameIsChanged={this.changeView}/>
        } else {
            return (
                <div className="mainAppView">
                    <UserHeader/>
                    <div style={{display: 'flex'}}>
                        <AppNavigation/>
                        <div className={'appMainContainer'}>
                            <div className={'dashboardContainer'}>
                                <Widgets/>
                                <ScheduleWeek/>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }
}

export default Pulpit;