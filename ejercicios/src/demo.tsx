import React from "react";


const useUserCollection = () => {
  const [userCollection, setUserCollection] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?username_like=${filter}`)
        .then(response => response.json())
        .then(json => setUserCollection(json));
  }, [filter]);


  return { filter, setFilter, userCollection}
}

export const MyComponent = () => {
  
 

    const { filter, setFilter, userCollection} = useUserCollection();

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />

      <ul>
        {userCollection.map((user, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </div>
  )

}

//Empezar clase 3.8 