import { useState } from "react"
import { useDispatch } from "react-redux"

import { Button, Form, FormControl, InputGroup } from "react-bootstrap"

import { status, priority } from '../../Helpers/constants'
import { editTask } from "../../Redux/ducks/tasksDuck"
import { api } from "../../Helpers/api"

const PopupEditor = ({ task, openEditWindow }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [taskStatus, setTaskStatus] = useState(task.status)
    const [taskPriority, setTaskPriority] = useState(task.priority)

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const changeStatus = (e) => {
        setTaskStatus(e.target.value)
    }

    const changePriority = (e) => {
        setTaskPriority(e.target.value)
    }

    const saveChangesHandler = (e) => {
        e.preventDefault();
        let editedTask = {
            id: task.id,
            title: title,
            description: description,
            status: taskStatus,
            priority: taskPriority,
        }
        if (!editedTask.title || !editedTask.description || !editedTask.status || !editedTask.priority) {
            alert('Please fill all the fields')
        } else {
            dispatch(editTask(editedTask))
            fetch(`${api}/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedTask),
            }).catch((err) => console.warn(err));
            openEditWindow()
        }
    }

    const cancelHandler = () => {
        openEditWindow()
    }

    return (
        <div className="background-popup">
            <div className="popup-editor">
                <h2>EDIT TASK</h2>
                <InputGroup size="lg" className='new-task-cont'>
                    <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder='Title' value={title} onChange={changeTitle} />
                </InputGroup>
                <InputGroup className='new-task-cont'>
                    <FormControl as="textarea" aria-label="With textarea" placeholder='Description' value={description} onChange={changeDescription} />
                </InputGroup>
                <div className='new-task-cont'>
                    Status:
                    <Form.Select aria-label="Default select example" className='new-task-selects' value={taskStatus} onChange={changeStatus}>
                        {status.map(item => <option key={item}>{item}</option>)}
                    </Form.Select>
                    Priority:
                    <Form.Select aria-label="Default select example" className='new-task-selects' value={taskPriority} onChange={changePriority} >
                        {priority.map(item => <option key={item}>{item}</option>)}
                    </Form.Select>
                </div>
                <div className='new-task-footer'>
                    <Button variant="outline-success" className='button' onClick={saveChangesHandler} >Save Changes</Button>
                    <Button variant="outline-danger" className='button' onClick={cancelHandler}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default PopupEditor