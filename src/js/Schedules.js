import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import {db} from "./firebase";
import {Link} from "react-router-dom";

const Header = () => (
    <div className={'recipesHeader'}>
        <h2>LISTA PLANÓW</h2>
        <Link to="/AddSchedule"> <i className="fas fa-plus-square fa-3x"> </i> </Link>
    </div>
);

class SchedulesTable extends React.Component {

    getInfo = () => {
        this.sendInfoDeleted();
    }

    sendInfoDeleted = () =>{
        this.props.scheduleIsDeleted()
    }

    render() {
        return (
            <table>
                <TableHead/>
                <TableData scheduleDeleted={this.getInfo}/>
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
    constructor(props){
        super(props);
        this.state = {
            allSchedules: [],
        };
    }

    sendInfoDeleted = () =>{
        this.props.scheduleDeleted()
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
            this.setState({
                allSchedules: result
            });

        }).catch(error => console.log('Error getting data: ' + error));
    };

    handleDelete = id => () => {
        const newAllSchedules = this.state.allSchedules.filter(schedule => schedule.id !== id);
        this.setState({
            allSchedules: newAllSchedules,
        });
        this.sendInfoDeleted();
        db.collection('Schedules').doc(id).delete().then(() => {
            console.log('Document successfully deleted!');
        }).catch(error => {
            console.error('Error removing document: ', error);
        });
    };

    render() {
        if(this.state.allSchedules.length === 0){
            return (
            <tbody>
            <tr>
                <td colSpan={'4'}>
                    <div className="lds-default">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </td>
            </tr>
            </tbody>
            )
        }
        return (
            <tbody>
            {this.state.allSchedules.map((schedule, i) => (

                <tr key={i}>
                    <td>{++i}</td>
                    <td>{schedule.data.scheduleName}</td>
                    <td>{schedule.data.scheduleDesc}</td>
                    <td>{schedule.data.scheduleNum}</td>
                    <td>
                        <Link to={"/EditSchedule/" + schedule.id}  style={{textDecoration: 'none'}}><i className="fas fa-edit fa-lg action warning"> </i></Link>
                        <i className="fas fa-trash-alt fa-lg action bin" onClick={this.handleDelete(schedule.id)}> </i>
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
    constructor(props){
        super(props);
        const name = this.props.location.state;
        this.state = {
            editedName: name,
            isDeleted: false
        }
    }

    handleDelete = () =>{
        this.setState({
            editedName: undefined,
            isDeleted: false
        })
    };

    changeState = () =>{
        this.setState({
            isDeleted: true
        });
    };


    render(){
        let notification = null;
        if (this.state.isDeleted === true){
            notification = (
                <div className={'editWidget'} onClick={this.handleDelete}>
                    <i className="fas fa-info-circle fa-2x"> </i>
                    <h2>Usunięto plan</h2>
                    <i className="fas fa-times-circle fa-2x"> </i>
                </div>
            )
        }else if (this.state.editedName === true){
            notification = (
                <div className={'editWidget'} onClick={this.handleDelete}>
                    <i className="fas fa-info-circle fa-2x"> </i>
                    <h2>Plan został pomyślnie dodany</h2>
                    <i className="fas fa-times-circle fa-2x"> </i>
                </div>
            )
        }else if (this.state.editedName !== undefined) {
            notification = (
                <div className={'editWidget'} onClick={this.handleDelete}>
                    <i className="fas fa-info-circle fa-2x"> </i>
                    <h2>{this.state.editedName} - Plan został pomyślnie edytowany</h2>
                    <i className="fas fa-times-circle fa-2x"> </i>
                </div>
            )
        }

        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <div className={'schedulesView'}>
                        <div>
                        {notification}
                        </div>
                        <div className={'recipesContainer'}>
                            <div className={'recipesTable'}>
                                <Header/>
                                <SchedulesTable scheduleIsDeleted={this.changeState}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Schedules