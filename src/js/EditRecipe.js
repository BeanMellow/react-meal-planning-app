import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
import RecipeForm from "./RecipeForm";

// import {NavLink} from "react-router-dom";


class EditRecipe extends React.Component {
    state = {
        recipeName: this.props.recipe.recipeName,
        recipeDesc: this.props.recipe.recipeDesc,
        recipeInst: this.props.recipe.recipeInst,
        recipeIngr: this.props.recipe.recipeIngr,
        id: this.props.recipe.id,
        // TODO: need current instructions / ingredients array from RecipeForm
        // instructions: this.props.recipe.instructions
    };

    handleSubmit = (instructions, ingredients) => {
        // event.preventDefault();
        db.collection('Recipes').doc(this.props.recipe.id).set({
            recipeName: this.state.recipeName,
            recipeDesc: this.state.recipeDesc,
            instructions: instructions,
            ingredients: ingredients
        }).then(() => {
            // TODO: ADD SUCCESS MESSAGE IN HTML
            console.log('Recipe successfully added to database');
            // TODO: make sure this is correct to avoid obj reference
            const editedRecipe = JSON.parse(JSON.stringify(this.state));
            editedRecipe.instructions = instructions;
            editedRecipe.ingredients = ingredients;
            // console.log(editedRecipe);
            this.props.finishEdit(editedRecipe);
            // this.setState({
            //     recipeName: '',
            //     recipeDesc: '',
            //     recipeInst: '',
            //     recipeIngr: '',
            // });
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

    // render() {
    //     return (
    //         <div className="mainAppView">
    //             <UserHeader/>
    //             <div style={{display: 'flex'}}>
    //                 <AppNavigation/>
    //                 <RecipeForm state={this.state}
    //                             handleChange={this.handleChange}
    //                             handleSubmit={this.handleSubmit}
    //                             setProperty={this.setProperty}
    //                     // isEdit={false}
    //                 />
    //             </div>
    //         </div>
    //     )
    // }

    render() {
        return (
            <RecipeForm state={this.state}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        setProperty={this.setProperty}
                        isEdit={true}
                        // then if isEdit=true in componentDidMount use props below
                        instructions={this.props.recipe.instructions}
                        ingredients={this.props.recipe.ingredients}
            />
        )
    }
}

export default EditRecipe;