import React from 'react';
import moment from 'moment';

const TableHeader = () => { 
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Date/Time</th>
                <th>First Visit?</th>
                <th>Department</th>
                <th>Doctor</th>
            </tr>
        </thead>
    );
}

const TableBody = props => { 
    const rows = props.apptData.map((row, index) => {
    
        let date = moment(row.date).format("LLL");
        // let dept = JSON.stringify(row.Department.value);
        // let doc = JSON.stringify(row.Doctor.value); 

        return (
            <tr key={index}>
                <td>{row.Name}</td>
                <td>{date}</td>
                <td>{row.option}</td>
                <td>{row.defaultDept}</td>
                <td>{row.defaultDoc}</td>
            </tr>
        );
    });

    
    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
   const {apptData} = props;

    return (
        <div>
            <table>
                <TableHeader />
                <TableBody apptData = {apptData}/>
            </table>
        </div>

    )

}

export default Table;