import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <List>
          <ul>
            {activities.map((activity) => (
              <List.Item key={activity.id}>{activity.title}</List.Item>
            ))}
          </ul>
        </List>
      </Container>
    </div>
  );
}

export default App;
