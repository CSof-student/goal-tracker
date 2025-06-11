import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './supabaseClient'

function App() {

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

  const [goals,setGoals] = useState('')

    async function fetchGoals(){
      const {data,error} = await supabase.from('goals').select('*')
      if(error){
        console.error(error)
        setMessage('Error creating goal')
      } else {
        console.log('Fetched goals:',data)
        setGoals(data)
      }
    }
  
    async function handleSubmit(e) {
      e.preventDefault()
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
      }
    }


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
          <button type='submit'>Create Goal</button>
        </form>

      <p>{message}</p>
      </div>
    )
}


export default App
