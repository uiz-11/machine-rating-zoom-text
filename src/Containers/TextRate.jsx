import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class TextRate extends Component {

  render() {
    const { confidence } = this.props; 

    let conf = parseInt(confidence * 100)
    if (conf > 50) {
      return (
        <Alert color="primary">
          The machine rated this answer: <b>Relevant</b>
          <br></br>
          With <b>{conf}</b>% confidence
        </Alert>
      );
    } else {
      return (
        <Alert color="warning">
          The machine rated this answer: <b>Not relevant</b>
          <br></br>
          With <b>{100-conf}</b>% confidence
        </Alert>
      );
    }
  }
}

export default TextRate;
