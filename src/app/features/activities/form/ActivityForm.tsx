import { PropsWithoutRef } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity";

interface Props {
  closeForm: () => void;
  selectedActivity: Activity | undefined;
}

const ActivityForm = ({ closeForm, selectedActivity }: Props) => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input placeholder="Date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          positive
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
