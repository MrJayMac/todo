import React, { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader';

function App() {

  //HARD CODING EMAIL
  const userEmail = 'joshua@test.com';

  const [task, setTask] = useState(null);

  const getData = async () => {

    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(task)

  return (
    <div className="App">
      <ListHeader />
      {/* other components */}
    </div>
  );
}

export default App;
