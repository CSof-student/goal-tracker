import React from "react"
import GoalForm from "../GoalForm"
import GoalList from "../GoalList"
import UserInfo from "../userInfo"

//stores the stuff shown on the dashboard page
function Dashboard({
    handleSubmit, 
    title, 
    setTitle, 
    targetValue,
    setTargetValue,
    unit,
    setUnit,
    editingGoalId,
    handleDelete,
    handleEdit,
    message,
    goals,
    session,
    handleSignOut
}){


    return(
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
        <GoalList
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            message={message}
            goals={goals}
            />
        <UserInfo
            session={session}
            handleSignOut={handleSignOut}
            />
            
        
        </div> 
    )
}
export default Dashboard