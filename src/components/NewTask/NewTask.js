import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'

import { status, priority } from '../../Helpers/constants.js'
import { addTask } from '../../Redux/ducks/tasksDuck'
import { api } from '../../Helpers/api'

const NewTask = ({ setNewTaskOpen, newTaskOpen }) => {
    const dispatch = useDispatch()
    const [statusElement, setStatusElement] = useState('')
    const [priorityElement, setPriorityElement] = useState('')

    const titleElement = useRef()
    const descriptionElement = useRef()

    const changeStatus = (e) => {
        setStatusElement(e.target.value)
    }

    const changePriority = (e) => {
        setPriorityElement(e.target.value)
    }

    const addTaskHandler = () => {
        let newTask = {
            title: titleElement.current.value,
            description: descriptionElement.current.value,
            status: statusElement,
            priority: priorityElement,
        }
        if (!newTask.title || !newTask.description || !newTask.status || !newTask.priority) {
            alert('Please fill all the fields')
        } else {
            fetch(`${api}/tasks/`, {
                method: 'POST',
                body: JSON.stringify(newTask),
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((json) => dispatch(addTask(json)))
            setNewTaskOpen(!newTaskOpen)
        }
    }

    const closeHandler = () => {
        setNewTaskOpen(!newTaskOpen)
    }

    return (
        <div className="background-popup">
            <div className="popup-editor">
                <h2>NEW TASK</h2>
                <InputGroup size="lg" className='new-task-cont'>
                    <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" ref={titleElement} placeholder='Title' />
                </InputGroup>
                <InputGroup className='new-task-cont'>
                    <FormControl as="textarea" aria-label="With textarea" ref={descriptionElement} placeholder='Description' />
                </InputGroup>
                <div className='new-task-cont'>
                    Status:
                    <Form.Select aria-label="Default select example" className='new-task-selects' value={statusElement} onChange={changeStatus}>
                        {status.map(item => <option key={item}>{item}</option>)}
                    </Form.Select>
                    Priority:
                    <Form.Select aria-label="Default select example" className='new-task-selects' value={priorityElement} onChange={changePriority} >
                        {priority.map(item => <option key={item}>{item}</option>)}
                    </Form.Select>
                </div>
                <div className='new-task-footer'>
                    <Button variant="outline-success" onClick={addTaskHandler} className='button' >Add Task</Button>
                    <Button variant="outline-danger" onClick={closeHandler} className='button'>Close</Button>
                </div>
            </div>
        </div>
    )
}

export default NewTask;