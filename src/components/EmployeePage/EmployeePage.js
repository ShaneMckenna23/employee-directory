import React from "react"
import EmployeePanel from '../EmployeePanel/EmployeePanel.js'

class EmployeePage extends React.Component {

    render() {
        let {selectedEmployee} = this.props
        return (
            <div className="employee-container">
                <h1 style={{marginLeft: '20px'}}>Employee</h1>
                <EmployeePanel employee={selectedEmployee}/>
            </div>
        );
    }
}

export default EmployeePage