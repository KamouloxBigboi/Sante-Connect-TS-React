import { Component } from "react";
import axios from "axios";

import UserService from "../services/user.service";

type Props = {};

type State = {
  content: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      );
      
      axios.get('http://localhost:5000/api/content/all')
        .then(response => {
          console.log(response.data.message);
        })
        
        .catch(error => {
          console.log(error);
        });
  }

  render() {
    const { content } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>
    );
  }
}
