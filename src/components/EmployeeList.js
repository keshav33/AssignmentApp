import React, {Component} from 'react'
import axios from 'axios'
import '../App.css'

class EmployeeList extends Component{

    constructor(props){
        super (props)
        this.state = {
            result: []
        }
    }

    tableStyle = {
        padding: '15px',
        textAlign: 'left',
    }

    componentDidMount(){
        axios.get('http://localhost:3003/employee-list')
        .then(response => {
            console.log(response.data)
            this.setState({
                result: response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            axios.get('http://localhost:3003/employee-list')
            .then(response => {
                console.log(response.data)
                this.setState({
                    result: response.data
                })
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }

    render(){
        return (<div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.result.map(item => <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.email}</td>
                        <td>{item.company}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>)
    }
}

export default EmployeeList;