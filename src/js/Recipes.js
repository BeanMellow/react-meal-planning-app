import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
import {Link} from "react-router-dom";

const Header = () => (
    <div className={'recipesHeader'}>
        <h2>LISTA PRZEPISÓW</h2>
        <Link to={'/AddRecipe'}><i className="fas fa-plus-square fa-3x"></i></Link>
    </div>
);

class RecipesTable extends React.Component {

    render() {
        return (
            <table>
                <TableHead/>
                <TableData allRecipes={this.props.allRecipes}
                           handleEdit={this.props.handleEdit}
                           handleDelete={this.props.handleDelete}
                />
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
        <th>AKCJE</th>
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
        allRecipes: []
    };

    handleDelete = id => () => {
        const newAllRecipes = this.state.allRecipes.filter(recipe => recipe.id !== id);
        this.setState({
            allRecipes: newAllRecipes
        });
        db.collection('Recipes').doc(id).delete().then(() => {
            console.log('Document successfully deleted!');
        }).catch(error => {
            console.error('Error removing document: ', error);
        });
    };

    getDataFromDb = () => {
        const result = [];

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
                allRecipes: result
            });

            console.log('Recipes loaded.')

        }).catch(error => console.log('Error getting data: ' + error));

    };

    render() {

        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <div className={'recipesContainer'}>
                        <div className={'recipesTable'}>
                            <Header/>
                            <RecipesTable allRecipes={this.state.allRecipes}
                                          handleEdit={this.handleEdit}
                                          handleDelete={this.handleDelete}
                            />
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

