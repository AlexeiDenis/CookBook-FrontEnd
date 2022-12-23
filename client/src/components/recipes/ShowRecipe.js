import React from "react";
import { connect } from "react-redux";
import { fetchRecipe } from "../../actions";
import Image from "../Image";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const keywords = [
  { n: "banana", v: "#F1CF2E" },
  { n: "apple", v: "#F7330E" },
  { n: "cucumber", v: "#466353" },
  { n: "onion", v: "#AFD46D" },
  { n: "lemon", v: "#E4BF45" },
];

class ShowRecipe extends React.Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.id);
    window.scrollTo(0, 0);
  }

  render() {
    if (!this.props.recipe) return <Loader />;
    const { description, title, image } = this.props.recipe;
    if (this.props.recipe.userId !== this.props.currentUserId) {
      return <h1>You're not the owner of the recipe</h1>;
    }

    return (
      <article>
        <section className="wrapper-hero">
          <div className="wrapper-hero__content">
            <h1>{title}</h1>
          </div>

          <Image title={title} image={image} width="100%" height="100%" />
        </section>
        <section className="recipe-wrapper">
          <React.Fragment>
            <h2>Mod de preparare:</h2>
            <p>
              {description.split(" ").map((word) => {
                for (let j = 0; j < keywords.length; j++) {
                  if (word === keywords[j].n) {
                    word = (
                      <span
                        className="bold"
                        style={{ color: `${keywords[j].v}` }}
                      >{` ${word} `}</span>
                    );
                    break;
                  }
                }
                return <span key={Math.random()}> {word} </span>;
              })}
            </p>
            <h2>Ingrediente:</h2>
            <ul>
              {this.props.recipe.ingredients.length === 0 ? (
                <h2>Nu ati adaugat ingrediente</h2>
              ) : this.props.recipe.ingredients.includes(null) ? (
                <p>
                  Ati introdus ingrediente fara valori!
                  <Link
                    to={`/recipes/edit/${this.props.match.params.id}`}
                    title={`edit ${title}`}
                    style={{ color: "blue" }}
                  >
                    Editati ingredientele
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </Link>
                </p>
              ) : (
                this.props.recipe.ingredients.map((word) => {
                  for (let i = 0; i < keywords.length; i++) {
                    if (word.ingredient === keywords[i].n) {
                      word.ingredient = (
                        <span
                          className="bold"
                          style={{ color: `${keywords[i].v}` }}
                        >
                          {word.ingredient}
                        </span>
                      );

                      break;
                    }
                  }

                  return (
                    <li key={Math.random()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                      </svg>{" "}
                      {word.quantity} {word.ingredient}
                    </li>
                  );
                })
              )}
            </ul>
          </React.Fragment>
        </section>
      </article>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: state.recipes[ownProps.match.params.id],
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchRecipe })(ShowRecipe);
