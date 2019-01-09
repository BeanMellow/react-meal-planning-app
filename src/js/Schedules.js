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
        allSchedules: []
    };

    getDataFromDb = category => {
        const result = [];

        db.collection(category).get().then(schedules => {

            schedules.forEach(schedule => {
                const schedulesContainer = {
                    data: schedule.data(),
                    id: schedule.id
                };
                result.push(schedulesContainer)
            });

            console.log(result);
            this.setState({
                allSchedules: result
            });

        }).catch(error => console.log('Error getting data: ' + error));

    };

    render() {
        return (
            <tbody>
            {this.state.allSchedules.map((schedule, i) => (
                <tr key={i}>
                    <td>{++i}</td>
                    <td>{schedule.data.scheduleName}</td>
                    <td>{schedule.data.scheduleDesc}</td>
                    <td>{schedule.data.scheduleNum}</td>
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