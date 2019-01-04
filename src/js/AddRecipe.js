import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import firebase, {db} from "./firebase";

// handleSubmit = () => {
//     // (event)
//     // event.preventDefault();
//     db.collection(this.state.category).doc(this.state.SKU).set({
//         name: this.state.name,
//         category: this.state.category,
//         price: this.state.price,
//         currency: this.state.currency,
//         SKU: this.state.SKU,
//         imageUrl: this.state.imageUrl,
//         description: this.state.description
//     }).then(() => {
//         console.log('Product successfully added to database');
//         this.setState({
//             name: '',
//             category: 'hoodie',
//             price: '',
//             currency: 'EUR',
//             SKU: '',
//             imageUrl: '',
//             description: ''
//         });
//     })
//         .catch(error => console.log('Error writing document: ', error));
// };

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