import { supabase } from "../supabaseClient";



//fetch goals for a given user
export async function fetchGoals(user_id){
    const {data,error} = await supabase.from('goals')
    .select('*')
    .eq('user_id',user_id)

    if(error){
      throw error
    } 
    return data ?? []
  }

  //inserts a goal into the database
  export async function insertGoal(goal) {
    const {data,error} = await supabase.from('goals').insert([goal],
         {returning: 'representation'})
      
      if(error){
        throw error
      } 
      return data
  }

  //edits/updates a goal in the database
  export async function updateGoal(goalId, updates) {
    const {data,error} = await supabase
        .from('goals')
        .update(updates)
        .eq('id', goalId)

        if(error){
            throw error
        }
        return data
  }

  //deletes a goal from the database
  export async function deleteGoal(goalId) {
    const {data,error}=await supabase.from('goals').delete().eq('id',goalId)
    if(error) {
        throw error
    }
    return data
  }