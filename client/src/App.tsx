import { useEffect, useState } from "react";
import * as apiClient from "./apiClients";

function App() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [userData2, setUserData] = useState({
    msg: "",
    data: {}
  })

  useEffect(() => {
    console.log(userData2);
    
  }, [userData2])

  const handleSubmit = async () => {
    const a = await apiClient.login(state);
    setUserData(a)    
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={state.email}
          onChange={(e) => {
            setState({ ...state, email: e.target.value });
          }}
        />
        <br />
        <input
          type="text"
          value={state.password}
          onChange={(e) => {
            setState({ ...state, password: e.target.value });
          }}
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div>
        <span></span>
      </div>
    </>
  );
}

export default App;
