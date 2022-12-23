import React from "react";
import Loader from "./components/Loader";
import ProfileMenu from "./components/ProfileMenu";
import { connect } from "react-redux";
import { signIn, signOut } from "./actions";

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shown: false };
  }
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:"910964783784-5m800thl9nhcohrc0p715egq03j52pii.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "Streamee",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onSignInClick = () => {
    Promise.resolve(this.auth.signIn());
  };
  onSignOutClick = () => {
    this.auth.signOut();
    this.setState({ shown: false });
  };
  onAuthChange = (isSignedIn) => {
    if (isSignedIn === true) {
      this.props.signIn(
        this.auth.currentUser.get().getId(),
        this.auth.currentUser.get().getBasicProfile().getEmail(),
        this.auth.currentUser.get().getBasicProfile().getImageUrl(),
        this.auth.currentUser.get().getBasicProfile().getName()
      );
    } else {
      this.props.signOut();
    }
  };
  renderAuthButton() {
    const className = `feather-arrow-down ${
      this.state.shown === true ? "open" : ""
    }`;
    const ariaExpandes = `${this.state.shown}`;
    if (this.props.isSignedIn === null) {
      return <Loader></Loader>;
    } else if (this.props.isSignedIn) {
      return (
        <div className="welcome-info">
          <p>
            Hello, <span>{this.props.name.split(" ")[0]}</span>
          </p>
          <button
            onClick={() => this.setState({ shown: !this.state.shown })}
            aria-expanded={ariaExpandes}
            className="button"
            title="Open Menu"
          >
            <div className="welcome-info__wrapper-image">
              <span className="welcome-info__arrow" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={className}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </span>
              <img
                alt={`${this.props.name} profile`}
                width={28}
                height={28}
                src={`${this.props.image}`}
                className="welcome-info__image"
              />
            </div>
          </button>

          {this.state.shown ? (
            <ProfileMenu
              email={this.props.email}
              signout={this.onSignOutClick}
              name={this.props.name}
            />
          ) : null}
        </div>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="button button__sign-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Sign in
        </button>
      );
    }
  }
  render() {
    return <React.Fragment>{this.renderAuthButton()}</React.Fragment>;
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    email: state.auth.email,
    image: state.auth.image,
    name: state.auth.name,
  };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
