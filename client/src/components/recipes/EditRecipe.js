import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchRecipe, editRecipe } from "../../actions";
import Loader from "../Loader";
import RecipeForm from "./RecipeForm";

class EditRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: false };
  }

  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.id);
    window.scrollTo(0,0);
  }
  onSubmit = (formValues) => {
    if (this.props.recipe.userId !== this.props.currentUserId)
      return this.setState({ test: true });
    return this.props.editRecipe(this.props.match.params.id, formValues);
  };
  render() {
    if (!this.props.recipe) {
      return (
        <div>
          Loading but better check console! <Loader />
        </div>
      );
    }

    if (this.props.recipe.userId !== this.props.currentUserId) {
      return <h1>You're not the owner of the recipe</h1>;
    }
    return (
      <React.Fragment>
        <div className="wrapper-header">
          <h1>Edit Recipe</h1>
        </div>
        <RecipeForm
          initialValues={_.pick(
            this.props.recipe,
            "title",
            "description",
            "ingredients",
            "image"
          )}
          onSubmit={this.onSubmit}
        />
        {this.state.test ? <p>You're not the owner of the recipe</p> : null}
    </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: state.recipes[ownProps.match.params.id],
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchRecipe, editRecipe })(
  EditRecipe
);
