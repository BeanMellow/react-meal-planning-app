import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";

const Header = () => (
    <div className={'recipesHeader'}>
        <h2>LISTA PRZEPISÓW</h2>
        <i className="fas fa-plus-square fa-3x"></i>
    </div>
);

class RecipesTable extends React.Component {

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
        <th>AKCJE</th>
    </tr>
    </thead>
);

class TableData extends React.Component {
    state = {
        allRecipes: []
    };

    handleEdit = recipe => () => {
        console.log(recipe);
    };

    handleDelete = id => () => {
        console.log(id);
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

    getDataFromDb = category => {
        const result = [];

        db.collection(category).get().then(recipes => {

            recipes.forEach(recipe => {
                const recipeWithId = recipe.data();
                recipeWithId.id = recipe.id;
                result.push(recipeWithId);
            });

            // TODO: ascending sort by recipeName - add to README
            result.sort((a, b) => {
                if (a.recipeName < b.recipeName) {
                    return -1;
                }
                if (a.recipeName > b.recipeName) {
                    return 1;
                }
                return 0;
            });

            this.setState({
                allRecipes: result
            });

        }).catch(error => console.log('Error getting data: ' + error));

    };

    render() {
        console.log(this.state.allRecipes);
        return (
            <tbody>
            {this.state.allRecipes.map((recipe, i) => (
                <tr key={i}>
                    <td>{++i}</td>
                    <td>{recipe.recipeName}</td>
                    <td>{recipe.recipeDesc}</td>
                    <td>
                        <i onClick={this.handleEdit(recipe)} className="fas fa-edit fa-lg action"></i>
                        <i onClick={this.handleDelete(recipe.id)} className="fas fa-trash-alt fa-lg action"></i>
                    </td>
                </tr>
            ))}
            </tbody>
        );
    }

    componentDidMount() {
        this.getDataFromDb('Recipes');
    }
}

class Recipes extends React.Component {
    render() {
        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <div className={'recipesContainer'}>
                        <div className={'recipesTable'}>
                            <Header/>
                            <RecipesTable/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipes;

