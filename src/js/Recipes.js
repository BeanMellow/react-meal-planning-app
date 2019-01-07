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

    getDataFromDb = category => {
        const result = [];

        db.collection(category).get().then(recipes => {
            recipes.forEach(recipe => result.push(recipe.data()));

            // TODO: CZY TO W TYM MIEJSCU JEST OK? SORTUJE 5X (PO KAZDEJ KAT)
            // result.sort((a, b) => a.SKU - b.SKU);
            // this.handleSort(Object.values(this.state.sort));
            console.log(result);
            this.setState({
                allRecipes: result
            });

        }).catch(error => console.log('Error getting data: ' + error));

    };

    render() {
        return (
            <tbody>
            {this.state.allRecipes.map((recipe, i) => (
                <tr key={i}>
                    <td>{++i}</td>
                    <td>{recipe.recipeName}</td>
                    <td>{recipe.recipeDesc}</td>
                    <td>
                        <i className="fas fa-edit fa-lg action"></i>
                        <i className="fas fa-trash-alt fa-lg action"></i>
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

