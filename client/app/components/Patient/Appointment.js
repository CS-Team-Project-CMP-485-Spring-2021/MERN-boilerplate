import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class Appointment extends Component{
  constructor(props) {
    super(props);

    // let d = new Date();
    // let startDate = d.getMonth();
    this.state = {
        Name: "",
        date: new Date(),
        option: "Yes",
        Department: [],
        defaultDept: "Choose Department",
        Doctor: [],
        defaultDoc: "Choose Doctor"
    };
  }

  componentDidMount(){
    this.setState({
      Department = [
        {name: "Pediatrics", Doctor: ["Geri O'Leary", "Khalil Bailey", "Laura Bellini", "Yohan Campito", "Alyssa Chan"]},
        {name: "Maternity", Doctor: ["Ranen Carter", "James Chu", "Kristina Cooper", "Michael Dore"]},
        {name: "Geriatrics", Doctor: ["Sarah Eaton", "Paul Giampa", "Jill Gupta"]},
        {name: "Psychiatrics", Doctor: ["Mohammed Gupta", "Alexia Hirt", "Patricia Ivey", "Jacob Jones", "Ronny Capelli", "Zach Blanco"]},
        {name: "Dermatology", Doctor: ["Elena Kunz", "Lenonard Lu", "Craig Matthews"]}
      ]

    });
  }

  handleNameChange = event => {
    this.setState({ 
        Name: event.target.value
        });  
  }

  handleDateChange = event => {
    this.setState({
      date: event.target.value
    })
  }

  handleVisitChange = event => {
    this.setState({
      option: event.target.value
    })
  }

  handleDeptChange = event => {
    this.setState({ defaultDept: event.target.value});
    this.setState({Doctor: this.state.Department.find(dept => dept.name === event.target.value).Doctor})
  }

  handleDocChange = event => {
    this.setState({defaultDoc: event.target.value})
  }

  

  onFormSubmit = (event) => {
    // to prevent page reload on form submit
    event.preventDefault();
    this.props.handleSubmit(this.state);

    this.setState({  
        Name: "",
        date: new Date(),
        option: "Yes"
    });
  }


  render(){
    
    return(
      <form onSubmit = {this.onFormSubmit}>
        <label>Name:</label>
        <input type="text" onChange= {this.handleNameChange} value={this.state.Name} ></input>

        <div>
          <strong>Department and Doctor</strong>
          <div>
            <label>Department</label>
            <select placeholder="Department" value={this.state.defaultDept} onChange={this.handleDeptChange}>
              <option>Choose Department</option>
              {this.state.Department.map((e,key) => { return <option key = {key}>{e.name}</option>})}
            </select>
          </div>

          <div>
            <label>Doctor</label>
            <select placeholder="Doctor">
              <option>Choose Doctor</option>
              {this.state.Doctor.map((e,key) => {return <option key = {key}>{e}</option>})}
            </select>
          </div>  
        </div>

        <div>
          <strong>Appointment Date</strong>
          <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"

          />
        </div>

        <div>
          <strong>First Time Visit?</strong>
          <ul>
            <li>
              <label>
                <input type="radio" value= "Yes" checked={this.state.selected === "Yes"} onChange={this.handleVisitChange}></input>
              </label>
            </li>

            <li>
              <label>
                <input type="radio" value= "No" checked={this.state.selected === "No"} onChange={this.handleVisitChange}></input>
              </label>
            </li>
          </ul>
        </div>
        



        <button onClick = {this.onFormSubmit}>Submit</button>

      </form>
      
    )
  }
   
}
export default Appointment;