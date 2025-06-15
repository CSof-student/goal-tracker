import { supabase } from "../supabaseClient";

//get current session
export async function getSession() {
    const {data, error} = await supabase.auth.getSession()
    if (error){
        throw error
    } else {
        return data.session
    }
}

//checks for a change in the logged in person/status (I think?)
export function onAuthStateChange(callback){
    return supabase.auth.onAuthStateChange((event,session) =>{
        callback(session)
    })
}


//handles the signing out
export async function signOut(){
    const {error} = await supabase.auth.signOut()
    if (error) {
        throw error
    } 
}