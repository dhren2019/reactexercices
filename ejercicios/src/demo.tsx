import React from "react";

interface Props {
  name: string;
  onChange: (value: string) => void;
}

const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
});

export const MyComponent = () => {
  const [userInfo, setInfo] = React.useState({ name: "John", lastname: "Doe" });

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername
        name={userInfo.name}
        onChange={(name) =>
          setInfo({
            ...userInfo,
            name,
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          setInfo({
            ...userInfo,
            lastname: e.target.value,
          })
        }
      />
    </>
  );
};

//clase 3.11