import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
// import {NavLink} from "react-router-dom";

// const ErrorList = props => (
//     <ul className={'errorList'}>
//         {props.items.map(item => (
//             <li key={item}>{item}</li>
//         ))}
//     </ul>
// );
const ErrorList = props => {
    let result = null;
    if (props.items) {
        result = (
            <ul className={'errorList'}>
                {props.items.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        );
    }
    return result;
};

// const SingleError = props => {
//   let result;
//   if (props.error) {
//       result = (
//           <ul className={'errorList'}>
//               <li>{props.error}</li>
//           </ul>
//       );
//   } else result = null;
//   return result;
// };

const List = props => {
    let list;
    const listItems = props.items.map((item, i) => (
        <li key={item}>
            {item}
            <i onClick={props.handleEdit(i, props.type)} className="fas fa-edit action"></i>
            <i onClick={props.handleDelete(i, props.type)} className="fas fa-trash-alt action"></i>
        </li>
    ));
    if (props.type === 'instructions') {
        list = <ol>{listItems}</ol>;
    } else if (props.type === 'ingredients') {
        list = <ul>{listItems}</ul>;
    }
    return list;
};

class AddRecipe extends React.Component {
    state = {
        recipeName: '',
        recipeDesc: '',
        recipeInst: '',
        recipeIngr: '',
        instructions: [],
        ingredients: [],
        nameValid: [],
        descValid: [],
        instructionValid: [],
        ingredientValid: [],
        editInstIndex: -1,
        editIngrIndex: -1
    };

    handleSubmit = event => {
        event.preventDefault();
        const recipeName = this.state.recipeName;
        const recipeDesc = this.state.recipeDesc;
        let nameError = '';
        let descError = '';
        if (recipeName.length < 3 || recipeName.length > 50) {
            // errors.push('Nazwa przepisu musi mieć od 3 do 50 znaków.');
            nameError = ['Nazwa przepisu musi mieć od 3 do 50 znaków.'];
        }
        if (recipeDesc.length < 10 || recipeDesc.length > 150) {
            // errors.push('Opis przepisu musi mieć od 10 do 150 znaków.');
            descError = ['Opis przepisu musi mieć od 10 do 150 znaków.'];
        }
        // TODO: decide how to finish validation - SingleError or ErrorsList?
        // let noIngredients = '';
        // if (this.state.ingredients.length < 1) {
        //     noIngredients = 'Przepis musi zawierać przynajmniej 1 instrukcję.'
        // }

        if (nameError || descError) {
            this.setState({
                nameValid: nameError,
                descValid: descError,
                // noIngredients: noIngredients
            });
        } else {
            db.collection('Recipes').doc(this.state.recipeName).set({
                recipeName: this.state.recipeName,
                recipeDesc: this.state.recipeDesc,
                instructions: this.state.instructions,
                ingredients: this.state.ingredients
            }).then(() => {
                console.log('Recipe successfully added to database');
                this.setState({
                    recipeName: '',
                    recipeDesc: '',
                    recipeInst: '',
                    recipeIngr: '',
                    instructions: [],
                    ingredients: [],
                    nameValid: [],
                    descValid: [],
                    instructionValid: [],
                    ingredientValid: [],
                    editInstIndex: -1,
                    editIngrIndex: -1
                });
            }).catch(error => console.log('Error writing document: ', error));
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleClick = name => () => {
        let newState;
        const errors = [];
        if (name === 'instruction') {
            const recipeInst = this.state.recipeInst;
            const instructions = this.state.instructions;
            const index = this.state.editInstIndex;

            if (recipeInst.length < 10 || recipeInst.length > 150) {
                errors.push('Każdy podpunkt instrukcji musi mieć od 10 do 150 znaków.');
            }
            // check if input is unique
            if (instructions.indexOf(recipeInst) > -1) {
                errors.push('Każdy podpunkt instrukcji musi być unikalny.');
            }

            if (errors.length) {
                this.setState({
                    instructionValid: errors
                });
            } else {
                newState = [...instructions];
                // newState.push(recipeInst);
                index >= 0 ? newState.splice(index, 1, recipeInst) : newState.push(recipeInst);
                this.setState({
                    recipeInst: '',
                    instructions: newState,
                    instructionValid: [],
                    editInstIndex: -1
                });
            }
        } else if (name === 'ingredient') {
            const recipeIngr = this.state.recipeIngr;
            const ingredients = this.state.ingredients;
            const index = this.state.editIngrIndex;

            if (recipeIngr.length < 3 || recipeIngr.length > 50) {
                errors.push('Każdy podpunkt składników musi mieć od 3 do 50 znaków.')
            }
            // check if input is unique
            if (ingredients.indexOf(recipeIngr) > -1) {
                errors.push('Każdy podpunkt składników musi być unikalny.');
            }

            if (errors.length) {
                this.setState({
                    ingredientValid: errors
                });
            } else {
                newState = [...ingredients];
                // newState.push(recipeIngr);
                index >= 0 ? newState.splice(index, 1, recipeIngr) : newState.push(recipeIngr);
                this.setState({
                    recipeIngr: '',
                    ingredients: newState,
                    ingredientValid: [],
                    editIngrIndex: -1
                });
            }
        }
    };

    // TODO: BLOCK OTHER EDIT/DELETE DURING EDITING - CAUSING ERRORS
    handleEdit = (i, type) => event => {
        console.log(i, type, event.target);
        if (type === 'instructions' && this.state.editInstIndex < 0) {
            const editInst = this.state.instructions[i];
            this.setState({
                recipeInst: editInst,
                editInstIndex: i
            });
        } else if (type === 'ingredients'  && this.state.editIngrIndex < 0) {
            const editIngr = this.state.ingredients[i];
            this.setState({
                recipeIngr: editIngr,
                editIngrIndex: i
            });
        }
    };

    handleDelete = (i, type) => event => {
        console.log(i, type, event.target);
        let newState;
        if (type === 'instructions') {
            newState = [...this.state.instructions];
            newState.splice(i, 1);
            this.setState({
                instructions: newState
            });
        } else if (type === 'ingredients') {
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
                    <div className={'addRecipeContainer'}>
                        <form className={'addRecipeForm'} onSubmit={this.handleSubmit}>
                            <div className={'addRecipeHeader'}>
                                <h2>NOWY PRZEPIS</h2>
                                <button type={'submit'}>Zapisz i zamknij</button>
                            </div>
                            <div className={'addRecipeInput-horiz'}>
                                <h2>Nazwa przepisu</h2>
                                <input value={this.state.recipeName}
                                       onChange={this.handleChange('recipeName')}
                                       type="text"/>
                            </div>
                            <ErrorList items={this.state.nameValid}/>
                            <div className={'addRecipeInput-horiz'}>
                                <h2>Opis przepisu</h2>
                                <input value={this.state.recipeDesc}
                                       onChange={this.handleChange('recipeDesc')}
                                       type="text"/>
                            </div>
                            <ErrorList items={this.state.descValid}/>
                            <div className={'addRecipeInput-vert'}>
                                <div>
                                    <h2>INSTRUKCJE</h2>
                                    <div>
                                        <input value={this.state.recipeInst}
                                               onChange={this.handleChange('recipeInst')}
                                               type="text"/>
                                        <i className="fas fa-plus-square fa-2x add"
                                           onClick={this.handleClick('instruction')}
                                        ></i>
                                    </div>
                                    <ErrorList items={this.state.instructionValid}/>
                                    <List items={this.state.instructions}
                                          handleDelete={this.handleDelete}
                                          handleEdit={this.handleEdit}
                                          type={'instructions'}
                                    />
                                </div>
                                <div>
                                    <h2>SKŁADNIKI</h2>
                                    <div>
                                        <input value={this.state.recipeIngr}
                                               onChange={this.handleChange('recipeIngr')}
                                               type="text"/>
                                        <i className="fas fa-plus-square fa-2x add"
                                           onClick={this.handleClick('ingredient')}
                                        ></i>
                                    </div>
                                    <ErrorList items={this.state.ingredientValid}/>
                                    {/*<SingleError error={this.state.noIngredients}/>*/}
                                    <List items={this.state.ingredients}
                                          handleDelete={this.handleDelete}
                                          handleEdit={this.handleEdit}
                                          type={'ingredients'}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddRecipe;