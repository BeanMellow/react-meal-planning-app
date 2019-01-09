import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import {db} from "./firebase";

const ErrorMessage = props => {
    let result;
    if (props.error.length) {
        result = (
            <ul className={'errorList'}>
                <li>{props.error}</li>
            </ul>
        );
    } else {
        result = null;
    }
    return result;
};

class WeekScheduleTable extends React.Component{
    render(){
        return (
            <table className={'weekScheduleTable'}>
                <ScheduleTableHead/>
                <ScheduleSelectors/>
            </table>
        )
    }
}

const ScheduleTableHead = () => (
    <thead>
        <tr>
            <th> </th>
            <th>ŚNIADANIE</th>
            <th>DRUGIE ŚNIADANIE</th>
            <th>ZUPA</th>
            <th>DRUGIE DANIE</th>
            <th>PODWIECZOREK</th>
            <th>KOLACJA</th>
        </tr>
    </thead>
);

class ScheduleSelectors extends React.Component{
    constructor(){
        super();

        this.state = {
            week: ["PONIEDZIAŁEK", "WTOREK", "ŚRODA", "CZWARTEK", "PIĄTEK", "SOBOTA", "NIEDZIELA"],
            allRecipes: []
        }
    }

    getDataFromDb = category => {
        const result = [];

        db.collection(category).get().then(recipes => {
            recipes.forEach(recipe => result.push(recipe.data()));
            this.setState({
                allRecipes: result
            });
        }).catch(error => console.log('Error getting data: ' + error));

    };

    render(){
        return (
            <tbody>
            {this.state.week.map((day, i) => (
                <tr key={i}>
                    <td>{day}</td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option key={i} value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option key={i} value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option key={i} value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option key={i} value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option key={i} value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option key={i} value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                </tr>
            ))}
            </tbody>
        )
    }

    componentDidMount() {
        this.getDataFromDb('Recipes');
    }
}

class AddSchedule extends React.Component{
    constructor(){
        super();
        this.state = {
            scheduleName: '',
            scheduleDesc: '',
            scheduleNum: '',
            nameValid: [],
            descValid: [],
            numValid: [],
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        const scheduleName = this.state.scheduleName;
        const scheduleDesc = this.state.scheduleDesc;
        const scheduleNum = Number(this.state.scheduleNum);
        let nameError = '';
        let descError = '';
        let numError = '';
        if (scheduleName.length < 3 || scheduleName.length > 50) {
            nameError = 'Nazwa planu musi mieć od 3 do 50 znaków.';
        }
        if (scheduleDesc.length < 10 || scheduleDesc.length > 300) {
            descError = ['Opis planu musi mieć od 10 do 300 znaków.'];
        }
        if (scheduleNum.length < 1 || scheduleNum < 1 || scheduleDesc > 52) {
            numError = ['Numer planu musi być liczbą pomiędzy 1 a 52.'];
        }

        if (nameError || descError || numError) {
            this.setState({
                nameValid: nameError,
                descValid: descError,
                numValid: numError
            });
        } else {
            db.collection('Schedules').doc(this.state.scheduleName).set({
                scheduleName: this.state.scheduleName,
                scheduleDesc: this.state.scheduleDesc,
                scheduleNum: this.state.scheduleNum,

            }).then(() => {
                console.log(db.collection('Schedules'))
                this.setState({
                    scheduleName: '',
                    scheduleDesc: '',
                    nameValid: [],
                    descValid: [],
                    numValid: [],
                });
            }).catch(error => console.log('Error writing document: ', error));
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render(){
        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <div className={'addScheduleContainer'}>
                        <form className={'addScheduleForm'} onSubmit={this.handleSubmit}>
                            <div className={'addScheduleHeader'}>
                                <h2>NOWY PLAN</h2>
                                <button type={'submit'}>Zapisz i zamknij</button>
                            </div>
                            <div className={'addScheduleInput-horiz'}>
                                <label htmlFor={'recipeName'}>Nazwa planu</label>
                                <input type ='text'
                                       value ={this.state.scheduleName}
                                       onChange={this.handleChange('scheduleName')}
                                />
                            </div>
                            <ErrorMessage error={this.state.nameValid}/>
                            <div className={'addScheduleInput-horiz'}>
                                <label htmlFor={'recipeDescription'}>Opis planu</label>
                                <textarea onChange={this.handleChange('scheduleDesc')}
                                          value ={this.state.scheduleDesc}
                                />
                            </div>
                            <ErrorMessage error={this.state.descValid}/>
                            <div className={'addScheduleInput-horiz'}>
                                <label htmlFor={'recipeDescription'}>Numer tygodnia</label>
                                <input onChange={this.handleChange('scheduleNum')}
                                       value ={this.state.scheduleNum}

                                />
                            </div>
                            <ErrorMessage error={this.state.numValid}/>
                            <WeekScheduleTable/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSchedule;