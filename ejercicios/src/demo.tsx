import React from 'react';

export const MyChildComponent = () => {
  return <h4>Hello from child component</h4>
}

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  
  return <>{visible && <MyChildComponent />}
  <button onClick={() => setVisible(!visible)}>Click</button>
  </>

}

//Hooks clase 3.5 min 3