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
        instructions: [],
        ingredients: [],
        // nameValid: '',
        // descValid: '',
        // instructionValid: '',
        // ingredientValid: '',
        editInstIndex: -1,
        editIngrIndex: -1
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
                instructions: [],
                ingredients: [],
                // nameValid: [],
                // descValid: [],
                // instructionValid: [],
                // ingredientValid: [],
                editInstIndex: -1,
                editIngrIndex: -1
            });
        }).catch(error => console.log('Error writing document: ', error));
    };


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    // handleClick = name => () => {
    //     let newState;
    //     let error = '';
    //     if (name === 'instruction') {
    //         const recipeInst = this.state.recipeInst;
    //         const instructions = this.state.instructions;
    //         const index = this.state.editInstIndex;
    //
    //         if (recipeInst.length < 10 || recipeInst.length > 150) {
    //             error = 'Każdy podpunkt instrukcji musi mieć od 10 do 150 znaków.';
    //             // check if input is unique
    //         } else if (instructions.indexOf(recipeInst) > -1) {
    //             // different message during edit
    //             if (this.state.editInstIndex >= 0) {
    //                 error = 'Dokończ edycję wybranego punktu. Pamiętaj, że każdy podpunkt musi być unikalny.';
    //             } else {
    //                 error = 'Każdy podpunkt instrukcji musi być unikalny.';
    //             }
    //         }
    //
    //         if (error.length) {
    //             this.setState({
    //                 instructionValid: error
    //             });
    //         } else {
    //             newState = [...instructions];
    //             // newState.push(recipeInst);
    //             index >= 0 ? newState.splice(index, 1, recipeInst) : newState.push(recipeInst);
    //             this.setState({
    //                 recipeInst: '',
    //                 instructions: newState,
    //                 instructionValid: [],
    //                 editInstIndex: -1
    //             });
    //         }
    //     } else if (name === 'ingredient') {
    //         const recipeIngr = this.state.recipeIngr;
    //         const ingredients = this.state.ingredients;
    //         const index = this.state.editIngrIndex;
    //
    //         if (recipeIngr.length < 3 || recipeIngr.length > 50) {
    //             error = 'Każdy podpunkt składników musi mieć od 3 do 50 znaków.';
    //         }
    //         // check if input is unique (except during edit)
    //         if (ingredients.indexOf(recipeIngr) > -1) {
    //             // different message during edit
    //             if (this.state.editIngrIndex >= 0) {
    //                 error = 'Dokończ edycję wybranego punktu. Pamiętaj, że każdy podpunkt musi być unikalny.';
    //             } else {
    //                 error = 'Każdy podpunkt składników musi być unikalny.';
    //             }
    //         }
    //
    //         if (error.length) {
    //             this.setState({
    //                 ingredientValid: error
    //             });
    //         } else {
    //             newState = [...ingredients];
    //             // newState.push(recipeIngr);
    //             index >= 0 ? newState.splice(index, 1, recipeIngr) : newState.push(recipeIngr);
    //             this.setState({
    //                 recipeIngr: '',
    //                 ingredients: newState,
    //                 ingredientValid: [],
    //                 editIngrIndex: -1
    //             });
    //         }
    //     }
    // };

    handleClick = name => () => {
        if (name === 'instruction') {
            console.log('instruction in AddRecipe');
            const instructions = this.state.instructions;
            const recipeInst = this.state.recipeInst;
            const index = this.state.editInstIndex;
            const newState = [...instructions];

            index >= 0 ? newState.splice(index, 1, recipeInst) : newState.push(recipeInst);
            this.setState({
                recipeInst: '',
                instructions: newState,
                editInstIndex: -1
            });

        } else if (name === 'ingredient') {
            console.log('ingredient in RecipeForm');
            const recipeIngr = this.state.recipeIngr;
            const ingredients = this.state.ingredients;
            const index = this.state.editIngrIndex;
            const newState = [...ingredients];

            index >= 0 ? newState.splice(index, 1, recipeIngr) : newState.push(recipeIngr);
            this.setState({
                recipeIngr: '',
                ingredients: newState,
                editIngrIndex: -1
            });

        }
    };

    handleEdit = (i, type) => event => {
        // console.log(i, type, event.target);
        // block btn when editing list item
        if (type === 'instructions' && this.state.editInstIndex < 0) {
            const editInst = this.state.instructions[i];
            this.setState({
                recipeInst: editInst,
                editInstIndex: i
            });
            // block btn when editing list item
        } else if (type === 'ingredients' && this.state.editIngrIndex < 0) {
            const editIngr = this.state.ingredients[i];
            this.setState({
                recipeIngr: editIngr,
                editIngrIndex: i
            });
        }
    };

    handleDelete = (i, type) => event => {
        // console.log(i, type, event.target);
        let newState;
        // block btn when editing list item
        if (type === 'instructions' && this.state.editInstIndex < 0) {
            newState = [...this.state.instructions];
            newState.splice(i, 1);
            this.setState({
                instructions: newState
            });
            // block btn when editing list item
        } else if (type === 'ingredients' && this.state.editIngrIndex < 0) {
            newState = [...this.state.ingredients];
            newState.splice(i, 1);
            this.setState({
                ingredients: newState
            });
        }
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
                                handleClick={this.handleClick}
                                handleEdit={this.handleEdit}
                                handleDelete={this.handleDelete}
                                isEdit={false}
                    />
                </div>
            </div>
        )
    }
}

export default AddRecipe;