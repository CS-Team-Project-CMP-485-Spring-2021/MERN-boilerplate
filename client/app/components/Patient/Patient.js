import React from 'react';
import Table from './Table';
import Appointment from './Appointment';



class Patient extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            appointments: []
        };  
    }

    

    handleSubmit = appt => {
        this.setState((state) => ({
            appointments: state.appointments.concat(appt)
        }));
    }
    

    render() {

        const appoint = this.state.appointments;

        return (
            <div className="container">
                <h1 style={{color:'black', textDecoration: 'underline black'}}>Your Appointments</h1>
            
                <Table apptData = {appoint}/>
                
                <br/>
                    <h3 style={{color:'black', textDecoration: 'underline black' }}>Set Up An Appointment</h3>
                    <Appointment handleSubmit = {this.handleSubmit}/>
                <br/>

            </div>
        );
    }
}

export default Patient;