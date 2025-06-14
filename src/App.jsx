import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './supabaseClient'

import {Auth} from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import GoalForm from './components/GoalForm'
 

function App() {


  // useeffect allows you to run side effects ex: fetching data, in components
  //the function inside useeffect runs when the component renders
  // the second argument tells it to rerun
  //basically when the page loads It grabs the data in the database
  useEffect(() => {

    supabase.auth.getSession().then(({data:{session}}) => {
      setSession(session)
      if (session) {
        fetchGoals()
      }
    })
    const{data: listener} = supabase.auth.onAuthStateChange(
      (event,session) => {setSession(session)
        if (session) {
          fetchGoals()
        } else {
          setGoals([])
        }
      })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])


  //state variables
  // const [current value of variable, function that updates variable]
  //=useState(starting state of the variable)
  const [title, setTitle] = useState('')
  const [targetValue,setTargetValue] = useState('')
  const [unit,setUnit] = useState('')
  const [message,setMessage] = useState('')

  const [goals,setGoals] = useState([])
  const [editingGoalId, setEditingGoalId] = useState(null)

  const[session, setSession] = useState(null)

    async function fetchGoals(){
      const {data,error} = await supabase.from('goals').select('*').eq('user_id',session.user.id)
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
            unit: unit,
            user_id: session.user.id
            
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
      setEditingGoalId(goal.id ?? '')
    }

  if (!session) {
    return (
      <Auth supabaseClient={supabase} 
      appearance={{theme: ThemeSupa}}
      providers={[]}/>
    )
  }

    //what the page displays
    return (
      <div> 
      <GoalForm
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        targetValue={targetValue}
        setTargetValue={setTargetValue}
        unit={unit}
        setUnit={setUnit}
        editingGoalId={editingGoalId}
      />
      
      <p>{message}</p>
      <h2>Saved Goals:</h2>

      {goals.map(goal => (
      <div key={goal.id}>
        <h3>{goal.title}</h3>
          <p>{goal.target_value} {goal.unit}</p>
          <button onClick={() => handleDelete(goal.id)}>Delete</button>
          <button onClick={() => handleEdit(goal)}>edit</button>
      </div>
))}
      <div>
        <h4>User</h4>
        <h5>{session.user.email}</h5>


      </div>
      </div> 
    ) 
}


export default App
