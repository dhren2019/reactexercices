import React from "react";
import { useDebounce } from 'use-debounce';

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [debounceFilter] = useDebounce(filter, 500);
  const [userCollection, setUserCollection] = React.useState([]);

    React.useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users?username_like=${filter}`)
            .then(response => response.json())
            .then(json => setUserCollection(json));
      }, [debounceFilter]);

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