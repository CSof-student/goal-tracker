import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './supabaseClient'

import {Auth} from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import GoalForm from './components/GoalForm'
import GoalList from './components/GoalList'
import UserInfo from './components/userInfo'
import { updateGoal,deleteGoal, insertGoal, fetchGoals } from './services/goalService'
import { getSession, onAuthStateChange,signOut } from './services/authServices'
import { on } from 'ws'

import { Routes, Route, Link } from 'react-router'

import Dashboard from './components/pages/Dashboard' 
import Profile from './components/pages/Profile'
// app jsx should hold the global states for this part of the app
function App() {

  // useeffect allows you to run side effects ex: fetching data, in components
  //the function inside useeffect runs when the component renders
  // the second argument tells it to rerun
  //basically when the page loads It grabs the data in the database
  useEffect(() => {
    getSession().then((currrentSession) => {
      setSession(currrentSession)
    
    if (currrentSession){
      fetchGoalsForUser()
    }
  })

    const{data: listener} = onAuthStateChange(
      (session) => {setSession(session)
        if (session) {
          fetchGoalsForUser()
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

  //handles fetching goals from the database when able too.
  async function fetchGoalsForUser(){
      if(!session) {
        setGoals([])
        return
      }
      try{
        const data = await fetchGoals(session.user.id)
        setGoals(data)
      } catch (error) {
        console.error(error)
        setMessage('Error fetching goals')
      }
    }

  //inserts data to the tables when it gets submitted
    async function handleSubmit(e) {
      e.preventDefault()
      // if editting goal:
      if (editingGoalId) {
        try{
          await updateGoal(editingGoalId,{
            title: title,
            target_value: parseFloat(targetValue),
            unit: unit
          })
          resetFormAndRefresh()
        } catch (error){
          console.error(error)
          setMessage("error editing goal")
        }
          
      } else{
        //if not editing goal (then its inserting a new one)
        try {
          await insertGoal({
            title: title,
            target_value: parseFloat(targetValue),
            unit: unit,
            user_id: session.user.id
  
          })
          resetFormAndRefresh()
        } catch (error) {
          console.error(error)
          setMessage("error making goal")
        }
        
      }
      }
      
    //deletes data from the table
    async function handleDelete(goalID){
      await deleteGoal(goalID)
      fetchGoalsForUser()
    }

    //handles signout, not sure if its necesarry
    async function handleSignOut(){
      await signOut()
    }

    // puts existing values in the form to be editing and sets the goal being edited to the parameter
    async function handleEdit(goal) {
      setTitle(goal.title ?? '')
      setTargetValue(goal.target_value ?? '')
      setUnit(goal.unit ?? '')
      setEditingGoalId(goal.id ?? '')
    }

    //cleans the form after something is submitted in it
    function resetFormAndRefresh() {
      setMessage('Goal saved successfully!')
      setTitle('')
      setTargetValue('')
      setUnit('')
      setEditingGoalId(null)
      fetchGoalsForUser()
      
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

      <nav>
       <Link to="/">Dashboard</Link> | <Link to="/Profile">Profile</Link>
      
      </nav>
      
      <Routes>
        <Route path="/" element={<Dashboard
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        targetValue={targetValue}
        setTargetValue={setTargetValue}
        unit={unit}
        setUnit={setUnit}
        editingGoalId={editingGoalId}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        message={message}
        goals={goals}
        session={session}
        handleSignOut={handleSignOut}
         />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>

      </div>
      



      
    ) 
}

export default App
