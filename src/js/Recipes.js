import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
import EditRecipe from "./EditRecipe";

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
                    <tr key={i}>
                        <td>{++i}</td>
                        <td>{recipe.recipeName}</td>
                        <td>{recipe.recipeDesc}</td>
                        <td>
                            <i onClick={this.props.handleEdit(recipe)} className="fas fa-edit fa-lg action"></i>
                            <i onClick={this.props.handleDelete(recipe.id)} className="fas fa-trash-alt fa-lg action"></i>
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
        edit: {
            isEdit: false,
            recipe: false
        }
    };

    handleEdit = recipe => () => {
        // console.log(recipe.id);
        this.setState({
            edit: {
                isEdit: true,
                recipe
            }
        });
    };

    finishEdit = editedRecipe => {
        //TODO: check if this can be done better
        let newAllRecipes = [...this.state.allRecipes];
        const index = newAllRecipes.map(recipe => recipe.id).indexOf(editedRecipe.id);
        console.log(editedRecipe);
        // console.log(index);
        newAllRecipes.splice(index, 1, editedRecipe);
        //TODO: works fine, but mb tweak in the future - take into account sort state before update?
        // back to default sort after updating
        newAllRecipes.sort((a, b) => {
            if (a.recipeName < b.recipeName) {
                return -1;
            }
            if (a.recipeName > b.recipeName) {
                return 1;
            }
            return 0;
        });

        this.setState({
            allRecipes: newAllRecipes,
            //TODO: works fine, but mb tweak in the future - take into account sort state before update?
            // back to default sort after updating
            edit: {
                isEdit: false
            }
        });
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
        let result;
        if (this.state.edit.isEdit) {
            console.log(this.state.edit.recipe);
            result = <EditRecipe recipe={this.state.edit.recipe} finishEdit={this.finishEdit}/>
        } else {
            result = (
                <div className={'recipesContainer'}>
                    <div className={'recipesTable'}>
                        <Header/>
                        <RecipesTable allRecipes={this.state.allRecipes}
                                      handleEdit={this.handleEdit}
                                      handleDelete={this.handleDelete}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    {result}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getDataFromDb();
    }
}

export default Recipes;

