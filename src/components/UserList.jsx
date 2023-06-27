import React from 'react';
import User from './User';

function UserList(props) {
    const {users} = props;
    return (
        <div>
            {users.map(user=>{
                return (
                    <>
                        <User key={user.userId} user={user} />
                        <br />
                    </>
                )
            })}
        </div>
    );
}

export default UserList;