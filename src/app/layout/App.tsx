import React, { useEffect, useState } from "react";

import { Button, Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponents";
import axios from "axios";
import { useStore } from "../models/stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
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
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0]; //Exclude the time which is after the 'T'
        activities.push(activity); //push to new array
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity)
        .then(() => {
          setActivities([
            ...activities.filter((x) => x.id !== activity.id),
            activity,
          ]);

          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          //setSubmitting(false);
          return Promise.reject(error);
        });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity)
        .then(() => {
          setActivities([...activities, activity]);
        })
        .catch((error) => {
          console.log(error);
          //setSubmitting(false);
          return Promise.reject(error);
        });
      // axios
      //   .post<Activity>("http://localhost:5000/api/Activities", activity)
      //   .then(() => {
      //     setActivities([...activities, activity]);
      //   });
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    }
  }

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

  if (loading) return <LoadingComponent content="Loading app.." />;

  return (
    <div className="App">
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <h2>{activityStore.title}</h2>
        <Button
          content="Add exclamation!"
          positive
          onClick={activityStore.setTitle}
        />
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </div>
  );
}

export default observer(App);
