import { useParams } from "react-router-dom";
import EventForm from "./EventForm";

const CreateEvent = () => {
  const { groupId } = useParams();

  // console.log("CreateEvent component: groupId", groupId);
  const event = {
    venueId: 1,
    name: "",
    type: "",
    capacity: "",
    price: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    // startDate: "",
    // endDate: "",
    previewImage: "",
  };
  return <EventForm event={event} groupId={groupId} formType="Create Event" />;
};

export default CreateEvent;
