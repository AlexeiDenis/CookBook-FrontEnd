import React from "react";
import Modal from "../Modal";
import Loader from "../Loader";
import { connect } from "react-redux";
import { fetchRecipe, deleteRecipe } from "../../actions";
import { Link } from "react-router-dom";

class DeleteRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: false };
  }
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.id);
  }
  actions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => {
            this.props.deleteRecipe(id);
          }}
          className="button-modal-delete"
        >
          Delete
        </button>
        <Link to="/" className="button-modal-cancel">
          Cancel
        </Link>
      </React.Fragment>
    );
  }
  renderContent() {
    if (!this.props.recipe) {
      return (<p>Are you sure you want delete this recipe?</p>);
    }
    return (<p>Are you sure you want to delete this stream with title: <span className="bold"> {this.props.recipe.title}</span></p>);
  }
  render() {
    if (!this.props.recipe) {
      return (
        <div>
          Loading but better check console! <Loader />
        </div>
      );
    }
    if (this.props.recipe.userId !== this.props.currentUserId) {
      return <h1>You're not logged in</h1>;
    }
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.actions()}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: state.recipes[ownProps.match.params.id],
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(
  DeleteRecipe
);
