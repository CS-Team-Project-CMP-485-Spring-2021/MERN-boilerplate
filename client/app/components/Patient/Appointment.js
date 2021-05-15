import React from 'react';


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

        return (
            <tr key={index}>
                <td>{row.Name}</td>
                <td>{row.date}</td>
                <td>{row.option}</td>
                <td>{row.Department}</td>
                <td>{row.Doctor}</td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
   const apptData = props;

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
