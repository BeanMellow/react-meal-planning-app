import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";
// import {NavLink} from "react-router-dom";

const List = props => {
    let list;
    const listItems = props.items.map((item, i) => (
        <li key={i}>{item}</li>
    ));
    if (props.type === 'ol') {
        list = (
            <ol>{listItems}</ol>
        );
    } else if (props.type === 'ul') {
        list = (
            <ul>{listItems}</ul>
        );
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
        ingredients: []
    };

    handleSubmit = event => {
        event.preventDefault();
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
                ingredients: []
            });
        }).catch(error => console.log('Error writing document: ', error));
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleClick = name => event => {
        let newState;
        if (name === 'instruction') {
            newState = [...this.state.instructions];
            newState.push(this.state.recipeInst);
            this.setState({
                instructions: newState,
                recipeInst: ''
            });
        } else if (name === 'ingredient') {
            newState = [...this.state.ingredients];
            newState.push(this.state.recipeIngr);
            this.setState({
                ingredients: newState,
                recipeIngr: ''
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
                            <div className={'addRecipeInput-horiz'}>
                                <h2>Opis przepisu</h2>
                                <input value={this.state.recipeDesc}
                                       onChange={this.handleChange('recipeDesc')}
                                       type="text"/>
                            </div>
                            <div className={'addRecipeInput-vert'}>
                                <div>
                                    <h2>INSTRUKCJE</h2>
                                    <div>
                                        <input value={this.state.recipeInst}
                                               onChange={this.handleChange('recipeInst')}
                                               type="text"/>
                                        <i className="fas fa-plus-square fa-2x"
                                           onClick={this.handleClick('instruction')}
                                        ></i>
                                    </div>
                                    <List items={this.state.instructions} type={'ol'}/>
                                </div>
                                <div>
                                    <h2>SKŁADNIKI</h2>
                                    <div>
                                        <input value={this.state.recipeIngr}
                                               onChange={this.handleChange('recipeIngr')}
                                               type="text"/>
                                        <i className="fas fa-plus-square fa-2x"
                                           onClick={this.handleClick('ingredient')}
                                        ></i>
                                    </div>
                                    <List items={this.state.ingredients} type={'ul'}/>
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