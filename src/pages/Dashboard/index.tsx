import React, { useEffect, useState } from "react";
import firebase from "../../components/Firebase";
import { useHistory } from "react-router-dom";

function Dashboard() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        history.push("/");
      }
    });
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };

  const [user, setUser]: any = useState();
  const history = useHistory();

  return (
    <div>
      <h1>{user?.email}</h1>
      <button onClick={signOut}>Deslogar</button>
    </div>
  );
}

export default Dashboard;
