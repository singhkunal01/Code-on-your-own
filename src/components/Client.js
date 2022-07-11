import React from 'react'
import Avatar from 'react-avatar'

export const Client = ({username}) => {
  return (
    <div className="client">
      <Avatar name={username} size={50} round="14px" />
      {/* this avatar is comes from the package */}
      <span className="username">{username}</span>
    </div>
  );
}
