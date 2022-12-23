import React from "react";
import { connect } from "react-redux";
import { createRecipe } from "../../actions";
import RecipeForm from "./RecipeForm";


class CreateRecipe extends React.Component {
  onSubmit = (formValues) => {
    this.props.createRecipe(formValues);
  };
  componentDidMount(){
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div className="wrapper-form">
       <div className="wrapper-header">
          <h1>Create a Recipe</h1>
          
        </div>
        {this.props.isSignedIn? <RecipeForm onSubmit={this.onSubmit} />: <p>You're not signed in!</p>}
        
      </div>
    );
  }
}


const mapStateToProps=(state)=>{
  return{
    isSignedIn:state.auth.isSignedIn
  }
}
export default connect(mapStateToProps, { createRecipe })(CreateRecipe);
