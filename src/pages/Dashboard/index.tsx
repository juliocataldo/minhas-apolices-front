import React, { useEffect, useState } from "react";
import firebase from "../../components/Firebase";
import { useHistory } from "react-router-dom";

function Dashboard() {
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setUser(firebase.auth().currentUser);
    } else {
      history.push("/login");
    }
  }, []);

  const teste = () => {
    console.log(user);
  };

  const [user, setUser]: any = useState();
  const history = useHistory();

  return (
    <div>
      <h1>{user?.email}</h1>
    </div>
  );
}

export default Dashboard;
