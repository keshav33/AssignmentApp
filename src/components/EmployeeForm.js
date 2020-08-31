import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'
import EmployeeList from './EmployeeList'

class EmployeeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            email: '',
            company: '',
            id: '',
            message: ''
        }
    }

    addEmployee = (event) => {
        if (this.state.name.length > 0 && this.state.address.length > 0 && this.state.email.length > 0 && this.state.company.length > 0) {
            event.preventDefault()
            axios.post('http://localhost:3003/employee-form', {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,
                company: this.state.company
            })
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        id: response.data._id,
                        message: `New employee is added successfully! Employee ID:`
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.setState({
                        message: `Unable to add new employee`
                    })
                })

            this.setState({
                name: '',
                address: '',
                email: '',
                company: ''
            })
        }
        else {
            alert("Please enter valid values")
        }
    }

    render() {
        return (
            <>
                <div className='left'>
                    <h1>Employees Form</h1>
                    <br />
                    <form onSubmit={this.addEmployee}>
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" value={this.state.name} placeholder="Enter your name" onChange={event => this.setState({ name: event.target.value })}></input>
                        </div>
                        <br />
                        <div>
                            <label>Address</label>
                            <input type="text" name="address" value={this.state.address} placeholder="Enter your address" onChange={event => this.setState({ address: event.target.value })}></input>
                        </div>
                        <br />
                        <div>
                            <label>Email</label>
                            <input type="email" name="email" value={this.state.email} placeholder="Enter your email" onChange={event => this.setState({ email: event.target.value })}></input>
                        </div>
                        <br />
                        <div>
                            <label>Company Name</label>
                            <input type="text" name="company" value={this.state.company} placeholder="Enter company name" onChange={event => this.setState({ company: event.target.value })}></input>
                        </div>
                        <br />
                        <div>
                            <button type="submit">Add Employee</button>
                        </div>
                    </form>
                    <h4>
                        {this.state.message + this.state.id}
                    </h4>
                    <br />
                </div>
                <div className='right'>
                    <EmployeeList id={this.state.id}></EmployeeList>
                </div>
            </>
        )
    }
}

export default EmployeeForm