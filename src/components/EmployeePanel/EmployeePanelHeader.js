import React from "react"

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

export default EmployeePanelHeader