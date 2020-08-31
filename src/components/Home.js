import React from 'react'
import '../App.css'
import EmployeeForm from './EmployeeForm'
import SearchEmployee from './SearchEmployee'

function Home() {

    return (
        <div>
            <div>
                <EmployeeForm></EmployeeForm>
                <div className='left'>
                <SearchEmployee></SearchEmployee>
                </div>
            </div>
        </div>
    )
}

export default Home;