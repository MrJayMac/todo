import { useState } from 'react'
import { useCookies } from 'react-cookie'

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies] = useCookies(null)
  const editMode = mode === 'edit'

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((data) => ({
      ...data,
      [name]: value
    }))
  }

  const editData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData() // Refresh the task list after editing
      } else {
        console.error('Failed to edit the task')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData() // Refresh the task list after adding
      } else {
        console.error('Failed to create a new task')
      }
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{editMode ? "Edit your task" : "Create a new task"}</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <button onClick={editMode ? editData : postData}>
            {editMode ? 'Save Changes' : 'Create New Task'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Modal
