import React, { Component } from 'react'
import axios from 'axios'

class SearchEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            result: ''
        }
    }
    
    getEmployee = (event)=>{
        event.preventDefault()
        console.log("working")
        axios.post('http://localhost:3003/employee-detail',{id: this.state.id})
        .then(response=>{
            console.log(response.data)
            this.setState({
                result: response.data
            })
            console.log(this.state.result)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <br />
                <form onSubmit={this.getEmployee}>
                <h1>Search Employee</h1>
                <br />
                <input type='text' name="id" placeholder="Enter id to search" onChange={(event)=>{this.setState({id:event.target.value})}}></input>
                <button type="submit">Search by id</button>
                </form>
                <h4>Result</h4>
                Name: {this.state.result.name}
                <br />
                Address: {this.state.result.address}
                <br />
                Email: {this.state.result.email}
                <br />
                Company: {this.state.result.company}
            </div>
        )
    }
}

export default SearchEmployee;