import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import {db} from "./firebase";

const Header = () => (
    <div className={'recipesHeader'}>
        <h2>LISTA PLANÓW</h2>
        <i className="fas fa-plus-square fa-3x"> </i>
    </div>
);

class SchedulesTable extends React.Component {

    render() {
        return (
            <table>
                <TableHead/>
                <TableData/>
            </table>
        );
    }
}

const TableHead = () => (
    <thead>
    <tr>
        <th>ID</th>
        <th>NAZWA</th>
        <th>OPIS</th>
        <th>TYDZIEŃ  </th>
        <th> AKCJE</th>
    </tr>
    </thead>
);

class TableData extends React.Component{
    state = {
        allRecipes: []
    };

    getDataFromDb = category => {
        const result = [];

        db.collection(category).get().then(recipes => {
            recipes.forEach(recipe => result.push(recipe.data()));
            console.log(result);
            this.setState({
                allRecipes: result
            });

        }).catch(error => console.log('Error getting data: ' + error));

    };

    render() {
        return (
            <tbody>
            {this.state.allRecipes.map((schedule, i) => (
                <tr key={i}>
                    <td>{++i}</td>
                    <td>{schedule.scheduleName}</td>
                    <td>{schedule.scheduleDesc}</td>
                    <td>{schedule.scheduleNum}</td>
                    <td>
                        <i className="fas fa-edit fa-lg action"> </i>
                        <i className="fas fa-trash-alt fa-lg action"> </i>
                    </td>
                </tr>
            ))}
            </tbody>
        );
    }

    componentDidMount() {
        this.getDataFromDb('Schedules');
    }
}

class Schedules extends React.Component{
    render(){
        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <div className={'recipesContainer'}>
                        <div className={'recipesTable'}>
                            <Header/>
                            <SchedulesTable/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Schedules