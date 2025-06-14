import React from "react";

//manages the listing out of the goals, as well as the delete and edit cuz it's easier that way.
function GoalList({
    message,
    handleDelete,
    handleEdit,
    goals,
    session
}) {
    return(
    <div>
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
export default GoalList