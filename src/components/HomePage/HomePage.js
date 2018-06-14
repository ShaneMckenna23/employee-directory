import React from 'react'
import {FormControl} from 'react-bootstrap'
import EmployeeList from '../EmployeeList/EmployeeList.js'

class HomePage extends React.Component {

    onChange = (e) => this.props.onSearch(e)

    render() {
        return (
            <div className="home-container">
                <h1>Employee Directory</h1>
                <FormControl  onChange={this.onChange} />
                <EmployeeList employeeData={this.props.employeeData} onEmployeeClick={this.props.onEmployeeClick}/>
            </div>
        );
    }
}

export default HomePage