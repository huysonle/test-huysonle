import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [works, setWorks] = useState([
    {
      id: 1,
      status: false,
      name: 'Coding'
    },
    {
      id: 2,
      status: false,
      name: 'Cooking'
    },
    {
      id: 3,
      status: false,
      name: 'Running'
    }
  ]);
  const [isCompleted, setCompleted] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(works));
  }, [])

  const handleOpenListActive = () => {
    const listWork = localStorage.getItem('list');
    const newListWork = JSON.parse(listWork).filter(work => !work.status);
    setCompleted(false);
    setWorks(newListWork);
  }

  const handleOpenListAll = () => {
    const listWork = localStorage.getItem('list');
    setCompleted(false);
    setWorks(JSON.parse(listWork));
  }

  const handleOpenListCompleted = () => {
    const listWork = localStorage.getItem('list');
    const newListWork = JSON.parse(listWork).filter(work => work.status);
    setCompleted(true);
    setWorks(newListWork);
  }

  const handleStatus = (id, status) => {
    let listWork = [...works];
    const newlistWorks = listWork.map(work => {
      if (work.id === id) {
        work.status = !status
      }
      return work;
    })
    localStorage.setItem('list', JSON.stringify(newlistWorks));
    setWorks(newlistWorks);
  }

  const handleDeleteAll = () => {
    localStorage.setItem('list', JSON.stringify([]));
    setWorks([]);
  }

  const handleChangeValue = e => {
    setValue(e.target.value);
  }

  const handleAddnewItem = () => {
    let newListWorks = [...works];
    if (value !== "") {
      newListWorks.push({
        id: Math.random(),
        status: false,
        name: value
      })
      localStorage.setItem('list', JSON.stringify(newListWorks));
      setWorks(newListWorks);
    } else return;
  }

  return (
    <div className="App">
      <h3>#todo</h3>
      <div>
        <button onClick={handleOpenListAll}>all</button>
        <button onClick={handleOpenListActive}>active</button>
        <button onClick={handleOpenListCompleted}>completed</button>
      </div>
      <div>
        <input type={'text'} placeholder='add details' value={value} onChange={handleChangeValue} />
        <button onClick={handleAddnewItem}>Add</button>
      </div>
      <div>
        {works.map(work => {
          const { id, status, name } = work;
          return (
            <div key={id}>
              <input type={'checkbox'} checked={status} onChange={() => handleStatus(id, status)} />
              <span>{name}</span>
            </div>
          )
        })}
      </div>
      {isCompleted &&
        <button onClick={handleDeleteAll}>Delete all</button>
      }
    </div>
  );
}

export default App;