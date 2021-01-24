import React from 'react'

export const MyComponent : React.FC = () => {
const [myName, setMyname] = React.useState('Jhon Doe');
 return (
   <>
    Prueba
    <h4>{myName}</h4>
    <input value={myName}
      onChange={(e) => setMyname(e.target.value)}
     />
   </>
      )
    }