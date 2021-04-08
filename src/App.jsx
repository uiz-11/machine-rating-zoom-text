import React, { Component } from 'react';
import Modal from 'react-modal'; //http://reactcommunity.org/react-modal/
import { Container, Row, Col, Button } from 'reactstrap'; //
import { GoogleSpreadsheet } from 'google-spreadsheet';
import './App.css';
import Questions from './Containers/Questions';
import Surveys from './Containers/Surveys';

Modal.setAppElement('#root');

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const RESULTS_ID = process.env.REACT_APP_RESULTS_ID;
const TLX_ID = process.env.REACT_APP_TLX_ID;
const ELAB_ID = process.env.REACT_APP_ELAB_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

const spreadsheet = new GoogleSpreadsheet(SPREADSHEET_ID);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uID: 0,
      workerID: 0,
      completeCode: 0,
      toolOn: true, //True if in codebook on condition, False if in control
      consentSigned: false,
      questionsComplete: false,
      tlxComplete: false,
      elabComplete: false,
      surveysComplete: false,
      ratingsValues: {},
      tlxResults: {},
      elabResults:{},
    };

    this.finishExperiment = this.finishExperiment.bind(this);
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let foo = params.get('workerID');
    console.log(foo);
    if (foo) {
      this.setState({
        workerID: foo,
      });
    }
    this.runExperiment();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
    if (this.state.tlxComplete && this.state.elabComplete && this.state.completeCode === 0) {
      this.finishExperiment();
    }
  }

  appendSpreadsheet = async (sheet0row, resultsrow, tlxrow, elabrow) => {
    // try {
    //   await spreadsheet.useServiceAccountAuth({
    //     client_email: CLIENT_EMAIL,
    //     private_key: PRIVATE_KEY,
    //   });
    //   // loads document properties and worksheets
    //   await spreadsheet.loadInfo();

    //   const sheet0 = spreadsheet.sheetsById[SHEET_ID];
    //   const sheetResults = spreadsheet.sheetsById[RESULTS_ID];
    //   const sheetTlx = spreadsheet.sheetsById[TLX_ID];
    //   const sheetElab = spreadsheet.sheetsById[ELAB_ID];
      
    //   const result = await sheet0.addRow(sheet0row, {insert: true});
    //   const result2 = await sheetResults.addRow(resultsrow, {insert: true});
    //   const result3 = await sheetTlx.addRow(tlxrow, {insert: true});
    //   const result4 = await sheetElab.addRow(elabrow, {insert: true});
    // } catch (e) {
    //   console.error('Error: ', e);
    // }
  };

  runExperiment() {
    //Calc u_id
    const uID = Math.floor((Math.random() * 999999) + 10000);

    //Calc condition

    this.setState({
      uID: uID,
    });
  }

  signConsent() {
    this.setState({
      consentSigned: true
    });
  }

  onRatingComplete  = ratingsValues => {
    this.setState(
      {
        ratingsValues: ratingsValues,
        questionsComplete: true
      },
      () => { console.log(this.state.ratingsValues); }
    );
  }

  onTLXSubmit = (tlxValues) => {
    this.setState({
      tlxResults: tlxValues,
      tlxComplete: true,
    });
  }

  onElabSubmit = (elabValues) => {
    this.setState({
      elabResults: elabValues,
      elabComplete: true,
    });
  }

  finishExperiment() {
    //e.preventDefault();

    const {workerID, uID, toolOn, consentSigned, ratingsValues, tlxResults, elabResults} = this.state;

    //generate completion code
    const code = Math.floor((Math.random() * 99999) + 10000);

    //append data
    //sheet 0 {Worker_ID	u_ID	consent_signed	generated_code	paid}
    //sheet 1002124199 {u_ID	condition	Doc1	Doc2	Doc3	Doc4	Doc5	Doc6	Doc7	Doc8	Doc9	Doc10}
    //sheet 463326366 {u_ID	tlx1	tlx2	tlx3	tlx4	tlx5	tlx6}
    //sheet 1139674776 {u_ID	elab1	elab2	elab3	elab4	elab5	elab6	elab7	elab8}

    const sheet0row = {Worker_ID: workerID,	u_ID: uID,	consent_signed: consentSigned,	generated_code: code};
    const resultsRow = {u_ID: uID,	condition: toolOn,	...ratingsValues};
    console.log(resultsRow);
    const tlxRow = {u_ID: uID,	...tlxResults};
    const elabRow = {u_ID: uID,	...elabResults};

    //this.appendSpreadsheet(SHEET_ID, sheet0row);
    // this.appendSpreadsheet(sheet0row, resultsRow, tlxRow, elabRow);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ mrt_consent: sheet0row, mrt_ratings: resultsRow,
        mrt_tlx_answers: tlxRow, mrt_elab_answers: elabRow })
    };
    fetch('https://script.google.com/macros/s/AKfycbysvtxKlgBzNE1m-1zxeKrzp0t2vozOo8jWN9c34MxWLKTfSQ9q13NFM0smrAc3VqmX/exec', requestOptions)
        .then(response => {
          console.log(response);
          this.setState({
                surveysComplete: true,
                completeCode: code,
              });
        })
        .catch(error => console.log(error));
  }

  render() {
    const { consentSigned,
      questionsComplete,
      elabComplete,
      tlxComplete,
      surveysComplete } = this.state;

    return (
      <div className="App">
        <Modal
          isOpen={!consentSigned}
          onRequestClose={this.signConsent}
          contentLabel="Consent Form"
          shouldCloseOnOverlayClick={false}
        >
          <div>
          <p>You are being asked to complete a study for research purposes. The study is testing how data collection is affected by the use of additional tooling to assist workers. Completing this study is voluntary and you can stop at any time by closing this window.</p>
          <p>You must be 18 years of age or older to participate in this study.</p>
          <p>There are minimal risks associated with your participation in this study. You will receive $5 for completing this study. In order to receive full compensation for completing the study, you must complete all parts of the study and pass all attention checks, then enter the provided random number code into the MTurk HIT window.</p>
          <p>Please note that because you are participating in this research via MTurk, your participation will be listed on your MTurk profile. However, MTurk will not have access to your responses on the survey. Further, while we will have access to your MTurk ID, we will only use this information to pay you and then your ID will be deleted from our records and will no longer be associated with your responses.</p>
          <p>If you have any questions about the study itself, how it is implemented, or study compensation, please contact J Christensen at jtchrist@ncsu.edu or B Watson at bwatson@ncsu.edu . Please reference study number 16906 when contacting anyone about this project.</p>
          <p>If you have questions about your rights as a participant or are concerned with your treatment throughout the research process, please contact the NC State University IRB Director at IRB-Director@ncsu.edu, 919-515-8754, or fill out this confidential form online.</p>
          <p>If you consent to complete this survey, please click the "Yes I consent" button to continue.</p>
          </div>
          <Button onClick={() => this.signConsent()}>Yes, I consent</Button>
        </Modal>
        {/* <header>
          Header Text
        </header> */}
        <Container className="App-body">
          <Row>
            <Col className="p-4 col-sm-12 col-md-6 offset-md-3">
              <Questions
                onRatingComplete={this.onRatingComplete}
                toolOn={this.state.toolOn}
              />
            </Col>
          </Row>
        </Container>
        <Modal
          isOpen={questionsComplete && !surveysComplete}
          contentLabel="Surveys"
          shouldCloseOnOverlayClick={false}
        >
          <Surveys
            onTLXSubmit={this.onTLXSubmit}
            onElabSubmit={this.onElabSubmit}
            tlxComplete={this.state.tlxComplete}
            elabComplete={this.state.elabComplete}
          />
        </Modal>
        <Modal
          isOpen={questionsComplete && tlxComplete && elabComplete}
          contentLabel="CompletionCode"
          shouldCloseOnOverlayClick={false}
        >
          { surveysComplete
            ? (
              <div>
              <p>Thank you for participating! Your completion code is:</p>
              <p><b>{this.state.completeCode}</b></p>
              </div>
            )
            : (
              <div>
              <p>Generating completion code. Please wait.</p>
              </div>
            )
          }
        </Modal>
      </div>
    );
  }
}

export default App;
