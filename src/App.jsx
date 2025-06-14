import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './supabaseClient'

function App() {


  // useeffect allows you to run side effects ex: fetching data, in components
  //the function inside useeffect runs when the component renders
  // the second argument tells it to rerun
  //basically when the page loads It grabs the data in the database
  useEffect(() => {
    fetchGoals()
  }, [])


  //state variables
  // const [current value of variable, function that updates variable]
  //=useState(starting state of the variable)
  const [title, setTitle] = useState('')
  const [targetValue,setTargetValue] = useState('')
  const [unit,setUnit] = useState('')
  const [message,setMessage] = useState('')

  const [goals,setGoals] = useState([])
  const [editingGoalId, setEditingGoalID] = useState(null)

    async function fetchGoals(){
      const {data,error} = await supabase.from('goals').select('*')
      if(error){
        console.error(error)
        setMessage('Error creating goal')
      } else {
        console.log('Fetched goals:',data)
        if (data) {
          setGoals(data)
        } else{
          setGoals([])
        }
      }
    }
  //inserts data to the tables when it gets submitted
    async function handleSubmit(e) {
      e.preventDefault()
      // if editting goal:
      if (editingGoalId) {
        const {data,error} = await supabase
        .from('goals')
        .update(
          {
            title: title,
            target_value: parseFloat(targetValue),
            unit: unit
          })
          .eq('id', editingGoalId)

          if(error){
            console.error(error)
            setMessage('Error editing goal')
          } else {
            console.log(data)
            setMessage('Goal edited successfully!')
            setTitle('')
            setTargetValue('')
            setUnit('')
            fetchGoals();
          }
      } else{
        const {data,error} = await supabase.from('goals').insert([
          {
            title: title,
            target_value: parseFloat(targetValue),
            unit: unit
          }
        ], {returning: 'representation'})
        
        if(error){
          console.error(error)
          setMessage('Error creating goal')
        } else {
          console.log(data)
          setMessage('Goal created successfully!')
          setTitle('')
          setTargetValue('')
          setUnit('')
          fetchGoals();
        }
      }
      }
      

    //deletes data from the table
    async function handleDelete(goalID){
      await supabase.from('goals').delete().eq('id',goalID)
      fetchGoals()
    }

    async function handleEdit(goal) {
      setTitle(goal.title ?? '')
      setTargetValue(goal.target_value ?? '')
      setUnit(goal.unit ?? '')
      setEditingGoalID(goal.id ?? '')
    }



    //what the page displays
    return (
      <div style = {{padding: 20}}>

        <h1>Goal Tracker</h1>
        <form onSubmit={handleSubmit}> 
          <div>
            <label>Title:</label>
            <input value={title} onChange={e => setTitle(e.target.value)}/>
          </div>
          <div>
            <label>Unit:</label>
            <input value={unit} onChange={e => setUnit(e.target.value)}/>
          </div>
          <div>
            <label>Target Value</label>
            <input value={targetValue} onChange={e=>setTargetValue(e.target.value)}/>
          </div>
          <button type='submit'>
            {editingGoalId ? 'Save Changes' : 'Create Goal'}
          </button>
        </form>

      <p>{message}</p>
      <h2>Saved Goals:</h2>

      {goals.map(goal => (
      <div key={goal.id}>
        <h3>{goal.title}</h3>
          <p>{goal.target_value} {goal.unit}</p>
          <button onClick={() => handleDelete(goal.id)}>Delete</button>
          <button onClick={() => handleEdit(goal.id)}>edit</button>
      </div>
))}

      </div>
    ) 
}


export default App
