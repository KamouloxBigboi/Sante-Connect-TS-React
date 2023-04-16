import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string }
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                Bienvenue sur votre profil, <strong>{currentUser.username}</strong> !
              </h3>
              <p> Vous êtes sur la page qui centralise les informations et les données de votre compte </p>
              <div className="italic_info"> Chez Santé Connect, nous tenons à la transparence de vos données </div>
            </header>
            <main className="profile_main">
              <p>
                <strong>Token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substring(currentUser.accessToken.length - 20)}
              </p>
              <p>
                <strong>Votre identifiant unique :</strong>{" "}
                {currentUser.id}
              </p>
              <p>
                <strong>L'adresse Email lié à votre compte :</strong>{" "}
                {currentUser.email}
              </p>
              <strong>Votre statut au sein de la communauté :</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
            </main>
          </div> : null}
      </div>
    ); 
  }
}
