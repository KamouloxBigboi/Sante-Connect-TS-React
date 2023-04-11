import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

type Props = {};

type State = {
  username: string,
  email: string,
  age: number,
  password: string,
  gender: string,
  occupation: string,
  country: string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      age: 0,
      gender: "",
      occupation: "",
      country: "",
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("Veuillez compléter ce champs!"),
      email: Yup.string()
        .email("Cet email n'est pas valide.")
        .required("Veuillez compléter ce champs!"),
      password: Yup.string()
        .test(
          "len",
          "Le mot de passe doit être compris entre 6 et 40 caractères.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("Veuillez compléter ce champs!"),
    });
  }

  handleRegister(formValue: { username: string; 
                              email: string; 
                              password: string; 
                              age: number; 
                              gender: string; 
                              occupation: string; 
                              country: string }) {
    const { username,
            email,
            password,
            age,
            gender,
            occupation,
            country } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
                          username,
                          email,
                          password,
                          age,
                          gender,
                          occupation,
                          country
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      username: "",
      email: "",
      password: "",
      age: 0,
      gender: "",
      occupation: "",
      country: "",
      successful: false,
      message: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username"> Nom d'utilisateur </label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> Mot de passe </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="age"> Âge </label>
                    <Field
                      name="age"
                      type="age"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender"> Sexe/Genre - facultatif </label>
                    <Field
                      name="gender"
                      type="gender"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="occupation"> Profession </label>
                    <Field
                      name="occupation"
                      type="occupation"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="occupation"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="country"> Pays </label>
                    <Field
                      name="country"
                      type="country"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>


                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"> Inscription </button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
