import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          {/* <ul>
            {activities.map((activity) => (
              <List.Item key={activity.id}>{activity.title}</List.Item>
            ))}
          </ul> */}
          <ActivityList activities={activities} />
        </List>
      </Grid.Column>
    </Grid>
  );
}
