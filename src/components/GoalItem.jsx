import React from "react";


//handles the logic for showing individual goals on the list
function GoalItem({
    goal, 
    handleDelete,
    handleEdit

}) {
    return(
        <div key={goal.id}>
        <h3>{goal.title}</h3>
          <p>{goal.target_value} {goal.unit}</p>
          <button onClick={() => handleDelete(goal.id)}>Delete</button>
          <button onClick={() => handleEdit(goal)}>edit</button>
      </div>

    )
}
export default GoalItem