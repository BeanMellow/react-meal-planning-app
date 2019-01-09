import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import {db} from "./firebase";

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
                                <option value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option value={recipe}>{recipe.recipeName}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select>
                            {this.state.allRecipes.map((recipe, i) => (
                                <option value={recipe}>{recipe.recipeName}</option>
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
            descValid: []
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        const scheduleName = this.state.scheduleName;
        const scheduleDesc = this.state.scheduleDesc;
        let nameError = '';
        let descError = '';
        if (scheduleName.length < 3 || scheduleName.length > 50) {
            nameError = 'Nazwa planu musi mieć od 3 do 50 znaków.';
        }
        if (scheduleDesc.length < 10 || scheduleDesc.length > 150) {
            descError = ['Opis planu musi mieć od 10 do 150 znaków.'];
        }

        if (nameError || descError) {
            this.setState({
                nameValid: nameError,
                descValid: descError
            });
        } else {
            db.collection('Schedules').doc(this.state.scheduleName).set({
                scheduleName: this.state.recipeName,
                scheduleDesc: this.state.recipeDesc,
            }).then(() => {
                this.setState({
                    recipeName: '',
                    recipeDesc: '',
                    nameValid: [],
                    descValid: [],
                });
            }).catch(error => console.log('Error writing document: ', error));
        }
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
                                <input value={this.state.scheduleName}
                                       type='text'
                                       id='scheduleName'
                                />
                            </div>
                            <div className={'addScheduleInput-horiz'}>
                                <label htmlFor={'recipeDescription'}>Opis planu</label>
                                <textarea value={this.state.scheduleDesc}
                                          id={'recipeDescription'}
                                />
                            </div>
                            <div className={'addScheduleInput-horiz'}>
                                <label htmlFor={'recipeDescription'}>Numer tygodnia</label>
                                <input value={this.state.scheduleNum}
                                    id={'recipeDescription'}
                                />
                            </div>
                            <WeekScheduleTable/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSchedule;