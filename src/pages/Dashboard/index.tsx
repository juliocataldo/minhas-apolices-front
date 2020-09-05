import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  XYPlot,
  XAxis,
  YAxis,
  Hint,
  VerticalGridLines,
  LineMarkSeries,
  AreaSeries,
  MarkSeries,
  MarkSeriesCanvas,
  HorizontalGridLines,
  LineSeries,
} from "react-vis";

import firebase from "../../components/Firebase";
import * as S from "./styles";

function Dashboard() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        history.push("/");
      }
    });
  });

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
    <S.Container>
      <h1>{user?.email}</h1>

      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        <LineSeries
          data={[
            { x: 1, y: 10 },
            { x: 2, y: 5 },
            { x: 3, y: 15 },
          ]}
        />
        <XAxis />
        <YAxis />
      </XYPlot>

      <XYPlot width={300} height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <AreaSeries
          className="area-elevated-series-1"
          color="#79c7e3"
          data={[
            { x: 1, y: 10, y0: 1 },
            { x: 2, y: 25, y0: 5 },
            { x: 3, y: 15, y0: 3 },
          ]}
        />
        <AreaSeries
          className="area-elevated-series-2"
          color="#12939a"
          data={[
            { x: 1, y: 5, y0: 6 },
            { x: 2, y: 20, y0: 11 },
            { x: 3, y: 10, y0: 9 },
          ]}
        />
        <LineMarkSeries
          className="area-elevated-line-series"
          data={[
            { x: 1, y: 5.5 },
            { x: 2, y: 15 },
            { x: 3, y: 9 },
          ]}
        />
      </XYPlot>

      <button onClick={signOut}>Deslogar</button>
    </S.Container>
  );
}

export default Dashboard;
