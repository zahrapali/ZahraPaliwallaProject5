import "./App.css";
import { Component } from "react";
import Proposal from "./Proposal";
import firebase from "./firebase.js";
import Footer from "./Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      proposals: [],
      userInput: "",
      // {
      // name: 'testClientName0',
      // status: 'approved',
      // filePath: 'www.googledocs.com'
      // },
      // {
      //   name: 'testClientName1',
      //   status: 'not-approved',
      //   filePath: 'www.googledocs.com'
      // },
      // {
      //   name: 'testClientName2',
      //   status: 'not-approved',
      //   filePath: 'www.googledocs.com'
      // }
    };
  }

  //////////////////////////////////////////////////////////////////////////
  // Connecting to Firebase database

  componentDidMount() {
    // made a reference to the database
    const dbRef = firebase.database().ref();
    // get data from the database
    dbRef.on("value", (data) => {
      const firebaseDataObj = data.val();
      console.log(firebaseDataObj);

      // make a new empty array
      let proposalsArray = [];
      //use a for in loop to loop through the object
      for (let propertyKey in firebaseDataObj) {
        const formattedObj = {
          id: propertyKey,
          name: firebaseDataObj[propertyKey].name,
          status: firebaseDataObj[propertyKey].status,
          filePath: firebaseDataObj[propertyKey].filePath,
        };

        proposalsArray.push(formattedObj);
      }
      //extracting the key and value of the object
      // formate it to the way we want it
      // push this new item into the empty array
      console.log(proposalsArray);

      this.setState({
        proposals: proposalsArray,
      });
    });
  }

  //////////////////////////////////////////////////////

  // if we dont have handleInputChange we wouldnt be able get the value

  //

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    console.log(event.target);
    const inputObject = {
      name: event.target[0].value,
      status: event.target[1].value,
      filePath: event.target[2].value,
    };
    const dbRef = firebase.database().ref();
    dbRef.push(inputObject);
  };

  handleInputChange = (event) => {
    console.log(event.target.value);

    this.setState({
      userInput: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <header>
            <h1>Dear Razi,</h1>
            <h2>This is just for you.</h2>
            <h2>You picky fuck.</h2>
          </header>
          <section></section>

          <ul>
            <li>Name of Client</li>
            <li>Status</li>
            <li>File Link</li>
          </ul>
          {this.state.proposals.map((eachProposal) => {
            return (
              <Proposal
                key={eachProposal.propertyKey}
                name={eachProposal.name}
                status={eachProposal.status}
                filePath={eachProposal.filePath}
              />
            );
          })}
          <form id="form" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">Client Name:</label>
              <input
                type="text"
                placeholder="Maybe one day this will be a drop down menu, Today is not that day!"
                id="name"
                tabindex="1"
                required
                onChange={this.handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="status">Status:</label>
              <input
                type="text"
                placeholder="Approved or Not Approved! No judgment. Some Judgement."
                id="status"
                tabindex="2"
                required
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="filePath">File Link:</label>
              <input
                placeholder="File Link Razi Pazz"
                type="link"
                tabindex="3"
                id="filePath"
                required
                onChange={this.handleInputChange}
              />
            </div>

            <button id="submit" tabindex="4" type="submit">
              submit
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
