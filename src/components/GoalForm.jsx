import React from "react";


function GoalForm({
    handleSubmit,
    title,
    setTitle,
    targetValue,
    setTargetValue,
    unit,
    setUnit,
    editingGoalId
}) {
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


      </div>
    )
}
export default GoalForm