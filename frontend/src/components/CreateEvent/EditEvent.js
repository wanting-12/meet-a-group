import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventById } from "../../store/event";
import EventForm from "./EventForm";

const EditEvent = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const event = Object.values(
    useSelector((state) => state.event.singleEvent)
  )[0];

  useEffect(() => {
    dispatch(getEventById(eventId));
  }, [dispatch]);

  if (!event) return null;
  const groupId = event.groupId;
  return <EventForm event={event} groupId={groupId} formType="Update Event" />;
};

export default EditEvent;
