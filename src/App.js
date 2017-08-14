import React from 'react'
import {Col, Row, Button, Glyphicon, Panel, ListGroupItem, ListGroup, FormControl } from 'react-bootstrap'
import employeeList from './employeeList.json';
import {TransitionMotion, spring, presets} from 'react-motion';


const filterEmployee = (searchText, maxResults) => {
  return employeeList.filter((employee) => {
    if (employee.data.name.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    return false;
  }).slice(0, maxResults);
}

var maxResults = 3;

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedEmployee: employeeList[0].data,
            filteredEmployee: filterEmployee('', maxResults)
        }
    }

    onSearch = (event) => {
        this.setState({
            filteredEmployee: filterEmployee(event.target.value, maxResults)
        });
    }

    onEmployeeClick = (employee) => {
        this.setState({
            selectedEmployee: {name: employee.name, info: employee.info, contact: employee.contact}
        });
    }

    render() {
        return (
            <Col lg={8} md={7} sm={4} lgOffset={2}>
                <Col lg={6}>
                    <HomePage onSearch={this.onSearch} employeeData={this.state.filteredEmployee} onEmployeeClick={this.onEmployeeClick}/>
                </Col>
                <Col lg={6}>
                    <EmployeePage selectedEmployee={this.state.selectedEmployee}/>
                </Col>
            </Col>
        );
    }
}

class HomePage extends React.Component {

    onChange = (e) => this.props.onSearch(e)

    render() {
        return (
            <div className="home-container">
                <h1>Employee Directory</h1>
                <FormControl onChange={this.onChange} />
                <EmployeeList employeeData={this.props.employeeData} onEmployeeClick={this.props.onEmployeeClick}/>
            </div>
        );
    }
}

class EmployeePage extends React.Component {

    render() {
        let {selectedEmployee} = this.props
        return (
            <div className="employee-container">
                <h1>Employee</h1>
                <EmployeePanel employee={selectedEmployee}/>
            </div>
        );
    }
}

class EmployeePanel extends React.Component {

    render() {
        const employeePanelHeader = <EmployeePanelHeader employee={this.props.employee}/>
        const {contact} = this.props.employee

        return (
            <Panel bsClass="employee-card" header={employeePanelHeader}>
                <ListGroup>
                    <ListGroupItem>{contact.office}</ListGroupItem>
                    <ListGroupItem>{contact.mobile}</ListGroupItem>
                    <ListGroupItem>{contact.sms}</ListGroupItem>
                    <ListGroupItem>{contact.email}</ListGroupItem>
                </ListGroup>
            </Panel>
        );
    }
}

class EmployeePanelHeader extends React.Component {

    render() {
        const {name , info} = this.props.employee
        const image = "images/" + name + ".jpg"
        return (
            <div>
                <img src={image}/>
                <h2>{name}</h2>
                <h2>{info}</h2>
            </div>
        );
    }
}

class EmployeeList extends React.Component {

    getDefaultStyles = () => {
        let test =  this.props.employeeData.map(employee => ({...employee, style: {height: 0, opacity: 1}}));
    };

    getStyles = () => {
    const {employeeData} = this.props;
    
    return employeeData.map((employee, i) => {
      return {
        ...employee,
        style: {
            height: spring(125, presets.gentle),
            opacity: spring(1, presets.gentle),
        }
      };
    });
  };

    willEnter() {
        return {
            height: 0,
            opacity: 1,
        };
    };

    willLeave() {
        return {
            height: spring(0),
            opacity: spring(0),
        };
    };

    render() {
        return (
            <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {styles =>
               <ListGroup>
                {styles.map(({key, style, data}) =>
                  <EmployeeListItem key={key} style={style} employee={data} onEmployeeClick={this.props.onEmployeeClick}/>
                )}
                </ListGroup> 
            }
          </TransitionMotion>
            
        );
    }
}

class EmployeeListItem extends React.Component {

    onClick = () => {
        this.props.onEmployeeClick(this.props.employee)       
    }

    render() {
        const {name, info} = this.props.employee
        const image = "images/" + name + ".jpg"
        return (
            <div className="employee-item" style={this.props.style} onClick={this.onClick}>
                <img src={image}/>
                <div className="employee-item-text">
                    <h2>{name}</h2>
                    <p>{info}</p>
                </div>
            </div>
        );
    }
}

