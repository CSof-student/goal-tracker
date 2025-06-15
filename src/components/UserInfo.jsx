import React from "react";


//handles the logic for showing user info, also does the log out button Arm
function UserInfo({
    session,
    handleSignOut
}) {
    return(
        <div>
        <h4>User</h4>
        <h5>{session.user.email}</h5>
        <button onClick={() => handleSignOut()}> log out </button>


      </div>
    )
}
export default UserInfo