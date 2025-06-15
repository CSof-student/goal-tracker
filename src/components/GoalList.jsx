import React from "react";
import GoalItem from "./GoalItem";

//manages the listing out of the goals, as well as the delete and edit cuz it's easier that way.
function GoalList({
    message,
    handleDelete,
    handleEdit,
    goals,

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
      
      </div>
    )
}
export default GoalList