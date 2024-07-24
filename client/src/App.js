import React, { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem'

function App() {
  const [task, setTask] = useState(null)


  const getData = async () => {

    const userEmail = 'joshua@test.com'

    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTask(json)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(task)

  //sorting by date

  const sortedTask = task?.sort((a,b) => new Date (a.date) - new Date (b.date))

  return (
    <div className="App">
      <ListHeader listName={"Todo List"}/>
      {sortedTask?.map((task) => <ListItem key={task.id} task = {task}/>)}
    </div>
  );
}

export default App;
