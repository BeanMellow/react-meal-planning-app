import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
import {Link} from "react-router-dom";

class Notification extends React.Component {
    state = {
        visible: true
    };

    hide = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        let result;

        if (this.state.visible) {
            let type;
            switch (this.props.info[0]) {
                case 'add':
                    type = 'added';
                    break;
                case 'edit':
                    type = 'edited';
                    break;
                case 'delete':
                    type = 'deleted';
                    break;
            }

            result = (
                <div onClick={this.hide} className={'notification'}>
                    <div>
                        <i className="fas fa-info-circle fa-2x"></i>
                        <h2>{this.props.info[1] + ' - recipe successfully ' + type}</h2>
                        <i className="fas fa-times-circle fa-2x"></i>
                    </div>
                </div>
            );
        } else {
            result = null;
        }
        return result;
    }

    componentDidUpdate(prevProps) {
        // check if props were updated
        if (this.props.info !== prevProps.info) {
            this.setState({
                visible: true
            });
        }
    }
}

const Header = () => (
    <div className={'recipesHeader'}>
        <h2>LIST OF RECIPES</h2>
        <Link to={'/AddRecipe'}><i className="fas fa-plus-square fa-3x"></i></Link>
    </div>
);

class RecipesTable extends React.Component {
    render() {
        let result;
        if (this.props.allRecipes.length === 0) {
            result = (
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
            );
        } else {
            result = (
                <TableData allRecipes={this.props.allRecipes}
                           handleEdit={this.props.handleEdit}
                           handleDelete={this.props.handleDelete}
                />
            );
        }

        return (
            <table>
                <TableHead/>
                {result}
            </table>
        );
    }
}

const TableHead = () => (
    <thead>
    <tr>
        <th>No.</th>
        <th>NAME</th>
        <th>DESCRIPTION</th>
        <th>ACTIONS</th>
    </tr>
    </thead>
);

class TableData extends React.Component {

    render() {
        let result;
        if (this.props.allRecipes) {
            result = (
                <tbody>
                {this.props.allRecipes.map((recipe, i) => (
                    <tr key={recipe.id}>
                        <td>{++i}</td>
                        <td>{recipe.recipeName}</td>
                        <td>{recipe.recipeDesc}</td>
                        <td>
                            <Link to={"/EditRecipe/" + recipe.id}><i className="fas fa-edit fa-lg action warning"></i></Link>
                            {/*TODO: add warning dialog to confirm delete*/}
                            <i onClick={this.props.handleDelete(recipe.id)}
                               className="fas fa-trash-alt fa-lg action bin"></i>
                        </td>
                    </tr>
                ))}
                </tbody>
            );
        } else {
            result = null;
        }

        return result;
    }
}

class Recipes extends React.Component {
    state = {
        allRecipes: [],
        notification: []
    };

    handleDelete = id => () => {
        // const newAllRecipes = this.state.allRecipes.filter(recipe => recipe.id !== id);
        const newAllRecipes = JSON.parse(JSON.stringify(this.state.allRecipes));
        const index = newAllRecipes.map(recipe => recipe.id).indexOf(id);
        const deletedRecipe = newAllRecipes.splice(index, 1);

        db.collection('Recipes').doc(id).delete().then(() => {
            console.log('Document successfully deleted!');
            this.setState({
                allRecipes: newAllRecipes,
                notification: ['delete', deletedRecipe[0].recipeName]
            });
        }).catch(error => {
            console.error('Error removing document: ', error);
        });
    };

    getDataFromDb = () => {
        const result = [];
        let notification = [];
        if (typeof this.props.location.state !== 'undefined') {
            notification = this.props.location.state.notification;
        }

        db.collection('Recipes').get().then(recipes => {

            recipes.forEach(recipe => {
                const recipeWithId = recipe.data();
                recipeWithId.id = recipe.id;
                result.push(recipeWithId);
            });

            // TODO: ascending sort by recipeName - add to README
            result.sort((a, b) => {
                const nameA = a.recipeName.toUpperCase();
                const nameB = b.recipeName.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            this.setState({
                allRecipes: result,
                notification
            });

            console.log('Recipes loaded.')

        }).catch(error => console.log('Error getting data: ' + error));

    };

    render() {
        let notification = null;
        if (this.state.notification.length > 0) {
            notification = <Notification info={this.state.notification}/>
        }

        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <AppNavigation/>
                    <div className={'appMainContainer'}>
                        {notification}
                        <div className={'recipesContainer'}>
                            <div className={'recipesTable'}>
                                <Header/>
                                <div className={'tableData'}>
                                    <RecipesTable allRecipes={this.state.allRecipes}
                                                  handleEdit={this.handleEdit}
                                                  handleDelete={this.handleDelete}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getDataFromDb();
    }
}

export default Recipes;

