import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
// import {NavLink} from "react-router-dom";

// each error in different place -> map useless for now
// const ErrorList = props => {
//     let result = null;
//     if (props.items) {
//         result = (
//             <ul className={'errorList'}>
//                 {props.items.map(item => (
//                     <li key={item}>{item}</li>
//                 ))}
//             </ul>
//         );
//     }
//     return result;
// };

const ErrorMessage = props => {
    let result;
    if (props.error.length) {
        result = (
            <ul className={'errorList'}>
                <li>{props.error}</li>
            </ul>
        );
    } else {
        result = null;
    }
    return result;
};

const List = props => {
    let list;
    const listItems = props.items.map((item, i) => {
        const styleText = {color: '#4a4a49'};
        const styleIcon = {
            edit: {color: '#FFB03B'},
            delete: {color: '#BD4932'}
        };

        if (props.index >= 0) {
            props.index === i ? styleText.color = '#FFB03B' : styleText.color = '#A1A194';
            styleIcon.edit = {color: '#A1A194'};
            styleIcon.delete = {color: '#A1A194'};
        }

        return (
            <li key={item} style={styleText}>
                {item}
                <i onClick={props.handleEdit(i, props.type)}
                   className="fas fa-edit action"
                   style={styleIcon.edit}
                > </i>
                <i onClick={props.handleDelete(i, props.type)}
                   className="fas fa-trash-alt action"
                   style={styleIcon.delete}
                > </i>
            </li>
        );
    });

    if (props.type === 'instructions') {
        list = <ol className={'recipeList'}>{listItems}</ol>;
    } else if (props.type === 'ingredients') {
        list = <ul className={'recipeList'}>{listItems}</ul>;
    }

    return list;
};

class RecipeForm extends React.Component {
    state = {
        instructions: [],
        ingredients: [],
        nameValid: '',
        descValid: '',
        instructionValid: '',
        ingredientValid: '',
        editInstIndex: -1,
        editIngrIndex: -1
    };

    validation = event => {
        event.preventDefault();
        const recipeName = this.props.state.recipeName;
        const recipeDesc = this.props.state.recipeDesc;
        const instructions = this.state.instructions;
        const ingredients = this.state.ingredients;
        let nameError = '';
        let descError = '';
        let instError = '';
        let ingrError = '';
        if (recipeName.length < 3 || recipeName.length > 50) {
            nameError = 'Nazwa przepisu musi mieć od 3 do 50 znaków.';
        }
        if (recipeDesc.length < 10 || recipeDesc.length > 150) {
            descError = ['Opis przepisu musi mieć od 10 do 150 znaków.'];
        }
        if (instructions.length < 1) {
            instError = 'Nie można zapisać przepisu bez instrukcji.'
        }
        if (ingredients.length < 1) {
            ingrError = 'Nie można zapisać przepisu bez składników.'
        }

        if (nameError || descError || instError || ingrError) {
            this.setState({
                nameValid: nameError,
                descValid: descError,
                instructionValid: instError,
                ingredientValid: ingrError
            });
        } else {
            this.setState({
                nameValid: '',
                descValid: '',
                instructionValid: '',
                ingredientValid: '',
            });
            this.props.handleSubmit();
        }
    };

    handleClick = name => () => {
        let newState;
        let error = '';
        if (name === 'instruction') {
            const recipeInst = this.props.state.recipeInst;
            const instructions = this.state.instructions;
            const index = this.state.editInstIndex;

            if (recipeInst.length < 10 || recipeInst.length > 150) {
                error = 'Każdy podpunkt instrukcji musi mieć od 10 do 150 znaków.';
                // check if input is unique
            } else if (instructions.indexOf(recipeInst) > -1) {
                // different message during edit
                if (this.state.editInstIndex >= 0) {
                    error = 'Dokończ edycję wybranego punktu. Pamiętaj, że każdy podpunkt musi być unikalny.';
                } else {
                    error = 'Każdy podpunkt instrukcji musi być unikalny.';
                }
            }

            if (error.length) {
                this.setState({
                    instructionValid: error
                });
            } else {
                newState = [...instructions];
                index >= 0 ? newState.splice(index, 1, recipeInst) : newState.push(recipeInst);
                this.setState({
                    instructions: newState,
                    instructionValid: '',
                    editInstIndex: -1
                }, this.props.setProperty('recipeInst', ''));
            }
        } else if (name === 'ingredient') {
            const recipeIngr = this.props.state.recipeIngr;
            const ingredients = this.state.ingredients;
            const index = this.state.editIngrIndex;

            if (recipeIngr.length < 3 || recipeIngr.length > 50) {
                error = 'Każdy podpunkt składników musi mieć od 3 do 50 znaków.';
            }
            // check if input is unique (except during edit)
            if (ingredients.indexOf(recipeIngr) > -1) {
                // different message during edit
                if (this.state.editIngrIndex >= 0) {
                    error = 'Dokończ edycję wybranego punktu. Pamiętaj, że każdy podpunkt musi być unikalny.';
                } else {
                    error = 'Każdy podpunkt składników musi być unikalny.';
                }
            }

            if (error.length) {
                this.setState({
                    ingredientValid: error
                });
            } else {
                newState = [...ingredients];
                index >= 0 ? newState.splice(index, 1, recipeIngr) : newState.push(recipeIngr);
                this.setState({
                    ingredients: newState,
                    ingredientValid: '',
                    editIngrIndex: -1
                }, this.props.setProperty('recipeIngr', ''));
            }
        }
    };

    handleEdit = (i, type) => event => {
        // console.log(i, type, event.target);
        // block btn when editing list item
        if (type === 'instructions' && this.state.editInstIndex < 0) {
            const editInst = this.state.instructions[i];
            this.setState({
                editInstIndex: i
            }, this.props.setProperty('recipeInst', editInst));
            // block btn when editing list item
        } else if (type === 'ingredients' && this.state.editIngrIndex < 0) {
            const editIngr = this.state.ingredients[i];
            this.setState({
                editIngrIndex: i
            }, this.props.setProperty('recipeIngr', editIngr));
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
        const handleChange = this.props.handleChange;
        const handleClick = this.handleClick;
        const handleEdit = this.handleEdit;
        const handleDelete = this.handleDelete;
        return (
            <div className={'addRecipeContainer'}>
                <form className={'addRecipeForm'} onSubmit={this.validation}>
                    <div className={'addRecipeHeader'}>
                        <h2>NOWY PRZEPIS</h2>
                        <button type={'submit'}>Zapisz i zamknij</button>
                    </div>
                    <div className={'addRecipeInput-horiz'}>
                        <label htmlFor={'recipeName'}>Nazwa przepisu</label>
                        <input value={this.props.state.recipeName}
                               onChange={handleChange('recipeName')}
                               type='text'
                               id='recipeName'
                        />
                    </div>
                    <ErrorMessage error={this.state.nameValid}/>
                    <div className={'addRecipeInput-horiz'}>
                        <label htmlFor={'recipeDescription'}>Opis przepisu</label>
                        <textarea value={this.props.state.recipeDesc}
                                  onChange={handleChange('recipeDesc')}
                                  id={'recipeDescription'}
                        />
                    </div>
                    <ErrorMessage error={this.state.descValid}/>
                    <div className={'addRecipeInput-vert'}>
                        <div>
                            <label htmlFor={'recipeInstruction'}>INSTRUKCJE</label>
                            <div>
                                        <textarea value={this.props.state.recipeInst}
                                                  onChange={handleChange('recipeInst')}
                                                  id={'recipeInstruction'}
                                        />
                                <i className="fas fa-plus-square fa-2x add"
                                   onClick={handleClick('instruction')}
                                > </i>
                            </div>
                            <ErrorMessage error={this.state.instructionValid}/>
                            <List items={this.state.instructions}
                                  handleDelete={handleDelete}
                                  handleEdit={handleEdit}
                                  type={'instructions'}
                                  index={this.state.editInstIndex}
                            />
                        </div>
                        <div>
                            <label htmlFor={'recipeIngredient'}>SKŁADNIKI</label>
                            <div>
                                <input value={this.props.state.recipeIngr}
                                       onChange={handleChange('recipeIngr')}
                                       type="text"
                                       id={'recipeIngredient'}
                                />
                                <i className="fas fa-plus-square fa-2x add"
                                   onClick={handleClick('ingredient')}
                                ></i>
                            </div>
                            <ErrorMessage error={this.state.ingredientValid}/>
                            <List items={this.state.ingredients}
                                  handleDelete={handleDelete}
                                  handleEdit={handleEdit}
                                  type={'ingredients'}
                                  index={this.state.editIngrIndex}
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default RecipeForm;