import React from 'react'

export const MyComponent = () => {
  const [message, setMessage] = React.useState("inirial message");
  const [seconds, setSeconds] = React.useState(0);


  const sendRef = React.useRef(seconds)
  React.useEffect(() => {
    setTimeout(() => {
      console.log(seconds);
      setSeconds(1)
      sendRef.current = 1;
    }, 1000);

    setTimeout(() => {
      setMessage(`Total seconds: ${sendRef.current}`);
    }, 2000);
  }, []);


  return (
    <> 
    <h3>{message}</h3>
    <h4>{seconds}</h4>
    </>
  )  
}