import React, { useEffect} from "react";

import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";


import LoadingComponent from "./LoadingComponents";
import { useStore } from "../models/stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore(); 

  // useEffect(() => {
  //   axios
  //     .get<Activity[]>("http://localhost:5000/api/activities")
  //     .then((response) => {
  //       console.log(response);
  //       setActivities(response.data);
  //     });
  // }, []);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); 

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app.." />;

  return (
    <div className="App">
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </div>
  );
}

export default observer(App);
