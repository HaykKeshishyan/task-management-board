import TaskElement from "../../TaskElement/TaskElement";

const Todo = ({ tasks }) => {
    const filtered = tasks.filter(task => task.status === 'Todo')

    const tasksElement = filtered.sort((a, b) => a.id - b.id).map(item => <TaskElement key={item.id} item={item} />)

    return (
        <div className="task-page global-container">
            <h1 className="page-header">Todo</h1>
            {tasksElement}
        </div>
    )
}

export default Todo;