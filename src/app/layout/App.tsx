import React, { useEffect, useState } from "react";

import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";

import agent from "../api/agent";
import LoadingComponent from "./LoadingComponents";
import axios from "axios";
import { useStore } from "../models/stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  
  const [submitting, setSubmitting] = useState(false);

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

  function handleDeleteActivity(id: string) {
    setSubmitting(true);

    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((x) => x.id !== id)]);
        setSubmitting(false);
      })
      .catch((error) => {
        console.log("cant delete" + error);
      });
  }

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app.." />;

  return (
    <div className="App">
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </div>
  );
}

export default observer(App);
