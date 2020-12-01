import './App.css';
import { Component } from 'react';
import Proposal from './Proposal';
import firebase from './firebase.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      proposals: [],
      userInput: ''
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

    }
  }

  //////////////////////////////////////////////////////////////////////////
  // Connecting to Firebase database

  componentDidMount() {
    // made a reference to the database
    const dbRef = firebase.database().ref()
    // get data from the database
    dbRef.on('value', (data) => {
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
          filePath: firebaseDataObj[propertyKey].filePath
        };

        proposalsArray.push(formattedObj)


      }
      //extracting the key and value of the object
      // formate it to the way we want it
      // push this new item into the empty array 
      console.log(proposalsArray);

      this.setState({
        proposals: proposalsArray
      });
    })
  }


  //////////////////////////////////////////////////////

  // if we dont have handleInputChange we wouldnt be able get the value

  handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    // dbRef.push(this.state.userInput)
    // const name = $("#newClient").val();
    // const status = $("#newStatus").val();
    // const link = $("#newFile").val();


    // dbRef.push({
    //   // "id": id,
    //   "name": name,
    //   "status": status, 
    //   "link": link,
    // })

    

  }
  handleInputChange = (event) => {
    console.log(event.target.value);
    this.setState({
      userInput: event.target.value
    })


  }
  render() {
    return (
      <div>

        <h1>Dear Razi,</h1>
        <h2>This is just for you. You picky fuck.</h2>


        {
          this.state.proposals.map((eachProposal) => {
            return (
              <Proposal
                key={eachProposal.propertyKey}
                name={eachProposal.name}
                status={eachProposal.status}
                filePath={eachProposal.filePath}
              />
            )
          })
        }



        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newClient" >Client Name</label>
          <input
            type="text"
            id="newClient"
            onChange={this.handleInputChange}
          />

          <label htmlFor="newStatus" >Approved or Not Approved. It's simple razi. you dummy.</label>
          <input
            type="text"
            id="newStatus"
            onChange={this.handleInputChange}
          />

          <label htmlFor="newFile">File Link:</label>
          <input
            type="text"
            id="newFile"
            onChange={this.handleInputChange}
          />

          <button>submit</button>
        </form>



      </div>
    );
  }
}

export default App;
