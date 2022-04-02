import { useState } from 'react'

import edit from '../../Assets/img/edit.png'
import PopupEditor from '../PopupEditor/PopupEditor'

const TaskElement = ({ item }) => {
    const [isEditOpen, setIsEditOpen] = useState(false)

    const openEditWindow = () => {
        setIsEditOpen(!isEditOpen)
    }

    return (
        <div className={item.priority === 'Low' ? 'task-element-low' : item.priority === 'Normal' ? 'task-element-normal' : 'task-element-high'}>
            <div className='task-head'>
                <h3 className='task-header'>{item.title}</h3>
                <div className='task-prio'>
                    <div className='task-footer-details'>{'priority:' + ' ' + item.priority}</div>
                    <div className={item.priority === 'Low' ? 'oval-low' : item.priority === 'Normal' ? 'oval-normal' : 'oval-high'}></div>
                </div>
            </div>
            <p className='task-description'>{item.description}</p>
            <div className='task-footer-conteiner'>
                <div className='task-footer'>
                    <div className='task-footer-details'>{'status:' + ' ' + item.status}</div>
                </div>
                <img onClick={openEditWindow} src={edit} width={30} className='edit-btn' />
            </div>


            {isEditOpen ? <PopupEditor task={item} openEditWindow={openEditWindow} /> : <></>}

        </div>
    )
}

export default TaskElement;