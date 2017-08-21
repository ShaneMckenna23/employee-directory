import React from "react"
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import EmployeePanelHeader from './EmployeePanelHeader.js'

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

export default EmployeePanel