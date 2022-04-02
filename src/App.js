import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Todo from './components/pages/Todo/Todo';
import Doing from './components/pages/Doing/Doing';
import Done from './components/pages/Done/Done';
import { useEffect, useState } from 'react';
import { api } from './Helpers/api'
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from './Redux/ducks/tasksDuck'
import NewTask from './components/NewTask/NewTask';

function App() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.TasksDuck.tasks)
  const [newTaskOpen, setNewTaskOpen] = useState(false)

  useEffect(() => {
    fetch(`${api}/tasks`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setTasks(res));
      });
  }, [])

  return (
    <div className="App">
      <Header
        setNewTaskOpen={setNewTaskOpen}
        newTaskOpen={newTaskOpen} />

      {newTaskOpen ? <NewTask setNewTaskOpen={setNewTaskOpen} newTaskOpen={newTaskOpen} /> : ''}

      <Routes>
        <Route path={''} element={<Todo tasks={tasks} />} />
        <Route path={'/doing'} element={<Doing tasks={tasks} />} />
        <Route path={'/done'} element={<Done tasks={tasks} />} />
      </Routes>
    </div>
  );
}

export default App;
