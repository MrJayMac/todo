import React, { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem'
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookies, removeCookies] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken

  const [task, setTask] = useState(null)

  const getData = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      setTask(json)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if(authToken){
      getData();
    }}
  , []);

  console.log(task)

  //sorting by date

  const sortedTask = task?.sort((a,b) => new Date (a.date) - new Date (b.date))

  return (
    <div className="App">
      {!authToken && <Auth/>}
      {authToken &&
        <>
        <ListHeader listName={"Todo List"} getData={getData}/>
        <p>Welcome back {userEmail}</p>
        {sortedTask?.map((task) => <ListItem key={task.id} task = {task} getData={getData}/>)}
        </>}
    </div>
  );
}

export default App;
