import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
import RecipeForm from "./RecipeForm";
import {withRouter} from "react-router-dom";

class AddRecipe extends React.Component {
    state = {
        recipeName: '',
        recipeDesc: '',
        recipeInst: '',
        recipeIngr: ''
    };

    handleSubmit = (instructions, ingredients) => {
        db.collection('Recipes').add({
            recipeName: this.state.recipeName,
            recipeDesc: this.state.recipeDesc,
            instructions: instructions,
            ingredients: ingredients
        }).then(() => {
            // TODO: ADD SUCCESS MESSAGE IN HTML
            console.log('Recipe successfully added to database');
            // this.props.history.push('/Recipes');
            this.props.history.push({
                pathname: '/Recipes',
                state: {notification: ['add', this.state.recipeName]}
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
                    <div className={'appMainContainer'}>
                        <RecipeForm state={this.state}
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit}
                                    setProperty={this.setProperty}
                                    isEdit={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddRecipe);