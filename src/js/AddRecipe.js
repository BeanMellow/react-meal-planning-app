import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
import RecipeForm from "./RecipeForm";

// import {NavLink} from "react-router-dom";


class AddRecipe extends React.Component {
    state = {
        recipeName: '',
        recipeDesc: '',
        recipeInst: '',
        recipeIngr: '',
        // instructions: [],
        // ingredients: [],
        // nameValid: '',
        // descValid: '',
        // instructionValid: '',
        // ingredientValid: '',
        // editInstIndex: -1,
        // editIngrIndex: -1
    };

    handleSubmit = () => {
        // event.preventDefault();

        db.collection('Recipes').add({
            recipeName: this.state.recipeName,
            recipeDesc: this.state.recipeDesc,
            instructions: this.state.instructions,
            ingredients: this.state.ingredients
        }).then(() => {
            // TODO: ADD SUCCESS MESSAGE IN HTML
            console.log('Recipe successfully added to database');
            this.setState({
                recipeName: '',
                recipeDesc: '',
                recipeInst: '',
                recipeIngr: '',
                // instructions: [],
                // ingredients: [],
                // nameValid: [],
                // descValid: [],
                // instructionValid: [],
                // ingredientValid: [],
                // editInstIndex: -1,
                // editIngrIndex: -1
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
        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <RecipeForm state={this.state}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                setProperty={this.setProperty}
                                isEdit={false}
                    />
                </div>
            </div>
        )
    }
}

export default AddRecipe;