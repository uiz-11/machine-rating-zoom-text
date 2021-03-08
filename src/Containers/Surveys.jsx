import React, { Component } from 'react';
import { Button, Form, Input, Label, Table, Container, Row, Col } from 'reactstrap';
import './containers.css';

class Surveys extends Component {

  // constructor(props) {
  //   super(props);
  // }

  tlxSubmit = (e) => {
    e.preventDefault();

    const tlxValues = {
      'mental-demand': e.target.mental_demand.value,
      'physical-demand': e.target.physical_demand.value,
      'temporal-demand': e.target.temporal_demand.value,
      'performance': e.target.performance.value,
      'effort': e.target.effort.value,
      'frustration': e.target.frustration.value
    }

    this.props.onTLXSubmit(tlxValues);
  }

  elabSubmit = (e) => {
    e.preventDefault();

    const elabValues = {
      'elab1': e.target.e_q1.value,
      'elab2': e.target.e_q2.value,
      'elab3': e.target.e_q3.value,
      'elab4': e.target.e_q4.value,
      'elab5': e.target.e_q5.value,
      'elab6': e.target.e_q6.value,
      'elab7': e.target.e_q7.value,
      'elab8': e.target.e_q8.value,
      'elab9': e.target.e_q9.value,
      'elab10': e.target.e_q10.value
    }

    this.props.onElabSubmit(elabValues);
  }

  tlxScales() {
    return(
      <Container className="tlx-div"><Form onSubmit={this.tlxSubmit}>
        <Row>
          <Col>
            <h4>Instructions:</h4>
            <p>Evaluate your experience during the relevancy rating task you just completed by clicking at the point that matches your experience for each scale. Consider each scale indivdually. Please read the descriptions below carefully before rating.</p>
            <Table striped>
              <thead>
                <tr>
                  <th style={{width: 10+'%'}}>Title</th>
                  <th style={{width: 30+'%'}}>Description</th>
                  <th>Scale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mental Demand</td>
                  <td>How much mental and perceptual activity was required (e.g. thinking, deciding, calculating, remembering, looking, searching, etc.)? Was the task easy or demanding, simple or complex, exacting or forgiving?</td>
                  <td>
                    <div className="tlx-scale">
                    Low
                    <Input type="range" name="mental_demand" defaultValue="11" min="1" max="21" />
                    High
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Physical Demand</td>
                  <td>How much physical activity was required (e.g. pushing, pulling, turning, controlling, activating, etc.)? Was the task easy or demanding, slow or brisk, slack or strenuous, restful or laborious?</td>
                  <td>
                    <div className="tlx-scale">
                    Low
                    <Input type="range" name="physical_demand" defaultValue="11" min="1" max="21" />
                    High
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Temporal Demand</td>
                  <td>How much time pressure did you feel due to the rate or pace at which the tasks or task elements occurred? Was the pace slow and leisurely or rapid and frantic?</td>
                  <td>
                    <div className="tlx-scale">
                    Low
                    <Input type="range" name="temporal_demand" defaultValue="11" min="1" max="21" />
                    High
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Performance</td>
                  <td>How successful do you think you were in accomplishing the goals of the task set by the experimenter? How satisfied were you with your performance in accomplishing these goals?</td>
                  <td>
                    <div className="tlx-scale">
                    Low
                    <Input type="range" name="performance" defaultValue="11" min="1" max="21" />
                    High
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Effort</td>
                  <td>How hard did you have to work (mentally and physically) to accomplish your level of performance?</td>
                  <td>
                    <div className="tlx-scale">
                    Low
                    <Input type="range" name="effort" defaultValue="11" min="1" max="21" />
                    High
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Frustration</td>
                  <td>How insecure, discouraged, irritated, stressed, and annoyed versus secure, gratified, content, relaxed and complacent did you feel during the task?</td>
                  <td>
                    <div className="tlx-scale">
                    Low
                    <Input type="range" name="frustration" defaultValue="11" min="1" max="21" />
                    High
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row><Button type="submit">Submit</Button></Row>
      </Form></Container>
    );
  }

  elabSurvey() {
    return(
      <Container>
      <h4>Instructions:</h4>
      <p>Evaluate your experience during the relevancy rating task you just completed by clicking at the point that matches your experience for each scale. Consider each scale indivdually.</p>
      <hr />
      <Form className="elab-div" onSubmit={this.elabSubmit}>
        <div className="elab-row" id="e_q1">
          I had few thoughts in response
          <Input type="range" id="e_q1" defaultValue="3" min="1" max="5" />
          I had many thoughts in response
        </div>
        <div className="elab-row" id="e_q2">
          The answers had one meaning
          <Input type="range" id="e_q2" defaultValue="3" min="1" max="5" />
          The answers had multiple meanings
        </div>
        <div className="elab-row" id="e_q3">
          The answers had simple meaning
          <Input type="range" id="e_q3" defaultValue="3" min="1" max="5" />
          The answers had rich, complex meaning
        </div>
        <Label>As I rated, I thought about how to answer related to me and my family</Label>
        <div className="elab-row" id="e_q4">
          Strongly disagree
          <Input type="range" id="e_q4" defaultValue="3" min="1" max="5" />
          strongly agree
        </div>
        <Label>As I rated, I thought about how to answer related to other things that I know</Label>
        <div className="elab-row" id="e_q5">
          Strongly disagree
          <Input type="range" id="e_q5" defaultValue="3" min="1" max="5" />
          strongly agree
        </div>
        <Label>As I rated, I thought about how to answer related to other people</Label>
        <div className="elab-row" id="e_q6">
          Strongly disagree
          <Input type="range" id="e_q6" defaultValue="3" min="1" max="5" />
          strongly agree
        </div>
        <Label>As I rated, I thought about how to answer over and over again</Label>
        <div className="elab-row" id="e_q7">
          Strongly disagree
          <Input type="range" id="e_q7" defaultValue="3" min="1" max="5" />
          strongly agree
        </div>
        <Label>As I rated, I thought about what should be done</Label>
        <div className="elab-row" id="e_q8">
          Strongly disagree
          <Input type="range" id="e_q8" defaultValue="3" min="1" max="5" />
          strongly agree
        </div>
        <Label>Rate your level of understanding of how machine learning classification algorithms are trained</Label>
        <div className="elab-row" id="e_q9">
          Novice
          <Input type="range" id="e_q9" defaultValue="4" min="1" max="7" />
          expert
        </div>
        <Label>Rate the *overall* accuracy of the machine estimation of the rating compared to your final rating</Label>
        <div className="elab-row" id="e_q10">
          Not very accurate
          <Input type="range" id="e_q10" defaultValue="4" min="1" max="7" />
          very accurate
        </div>
        <Button type="submit">Submit</Button>
      </Form>
      </Container>
    )
  }

  runSurveys() {
    const { tlxComplete, elabComplete } = this.props;

    if (!tlxComplete) {
      return this.tlxScales();
    }
    if (!elabComplete) {
      return this.elabSurvey();
    }

    // if (tlxComplete && elabComplete) {
    //   return this.props.onComplete();
    // }

    return null;
  }

  componentWillUnmount() {
    console.log("surveys unmounted");
  }

  render() {
    return (
      <div className="surveys-body">
        {this.runSurveys()}
      </div>
    );
  }
}

// function TLXscale(props) {
//   return (
//     <div className="tlx-scale">
//       {props.id==='performance' ? 'Good' : 'Low'}
//       <Input type="range" ref={props.ref} name={props.id} defaultValue="11" min="1" max="21" />
//       {props.id==='performance' ? 'Bad' : 'High'}
//     </div>
//   );
// }

export default Surveys;
