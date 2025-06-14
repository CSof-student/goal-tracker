import React from "react";
import GoalItem from "./GoalItem";

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
      <GoalItem
        goal={goal}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        />
))}
      <div>
        <h4>User</h4>
        <h5>{session.user.email}</h5>


      </div>
      </div>
    )
}
export default GoalList