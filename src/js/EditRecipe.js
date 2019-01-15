import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
import RecipeForm from "./RecipeForm";
import {withRouter} from "react-router-dom";

class EditRecipe extends React.Component {
    state = {
        recipeName: '',
        recipeDesc: '',
        recipeInst: '',
        recipeIngr: '',
        instructions: [],
        ingredients: [],
        id: ''
    };

    getDataFromDb = () => {
        const recipeId = this.props.match.params.value;

        db.collection('Recipes').doc(recipeId).get().then(recipe => {
            const editedRecipe = recipe.data();
            console.log(editedRecipe);
            this.setState({
                recipeName: editedRecipe.recipeName,
                recipeDesc: editedRecipe.recipeDesc,
                instructions: editedRecipe.instructions,
                ingredients: editedRecipe.ingredients,
                id: recipeId
            });
        }).catch(error => console.log('Error getting data: ' + error));
    };

    handleSubmit = (instructions, ingredients) => {
        db.collection('Recipes').doc(this.state.id).set({
            recipeName: this.state.recipeName,
            recipeDesc: this.state.recipeDesc,
            instructions: instructions,
            ingredients: ingredients
        }).then(() => {
            // TODO: ADD SUCCESS MESSAGE IN HTML
            console.log('Recipe successfully updated');
            // this has to be here and not in RecipeForm - otherwise sometimes Recipes load before editedRecipe is updated
            // this.props.history.push('/Recipes');
            this.props.history.push({
                pathname: '/Recipes',
                state: {notification: ['edit', this.state.recipeName]}
            });
        }).catch(error => console.log('Error writing document: ', error));
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    setProperty = (name, value) => () => {
        this.setState({
            [name]: value
        });
    };

    render() {
        let result;

        if (this.state.instructions.length > 0 && this.state.ingredients.length > 0) {
            result = (
                <RecipeForm state={this.state}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            setProperty={this.setProperty}
                            isEdit={true}
                    // then if isEdit=true in RecipeForm->componentDidMount:
                    // load instructions/ingredients arrays
                />
            );
        } else {
            result = (
                <div className={'loader flexCenter'}>
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
                </div>
            );
        }

        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <div className={'appMainContainer'}>
                        {result}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getDataFromDb();
    }
}

export default withRouter(EditRecipe);