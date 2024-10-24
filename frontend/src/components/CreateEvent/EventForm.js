import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEvent, editEvent } from "../../store/event";
import Footer from "../Footer";
import Navigation from "../Navigation";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PickDate from "./DatePicker";
import "./EventForm.css";

const EventForm = ({ event, groupId, formType }) => {
  const history = useHistory();
  const currUser = useSelector((state) => state.session.user);

  const [name, setName] = useState(event.name);
  const [type, setType] = useState(event.type);
  const [capacity, setCapacity] = useState(event.capacity);
  const [price, setPrice] = useState(event.price);
  const [description, setDescription] = useState(event.description);
  const [startDate, setStartDate] = useState(new Date(event.startDate));
  const [endDate, setEndDate] = useState(new Date(event.endDate));
  // const [startDate, setStartDate] = useState(event.startDate);
  // const [endDate, setEndDate] = useState(event.endDate);
  const [previewImage, setPreviewImg] = useState(event.previewImage);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  console.log("event price", price === 0);
  const dispatch = useDispatch();

  let create = formType === "Create Event" ? true : false;

  useEffect(() => {
    const newErrors = {};
    if (name && name.length < 5)
      newErrors.name = "Event name needs to be at 5 least characters";
    if (!name) newErrors.noName = "Please enter the name for your event";
    // if (type && type !== "Online" && type !== "In person")
    //   newErrors.type = "Please choose the type of the event";
    if (type !== "Online" && type !== "In person")
      newErrors.type = "Please choose the type for the event";
    if (capacity && capacity < 0)
      newErrors.capacity = "Please enter the valid capacity for the event";
    if (capacity === "")
      newErrors.noCapacity = "Please enter the capacity for the event";
    if (price < 0)
      newErrors.invalidPrice = "Please enter the valid price for the event";
    if (price === "") newErrors.price = "Please enter the price for the event";
    if (description.length === 0)
      newErrors.description = "Please enter the description of the event";
    if (startDate && new Date(startDate) == "Invalid Date")
      newErrors.startDate = "Please enter the valid start date of the event";
    if (endDate && new Date(endDate) == "Invalid Date")
      newErrors.endDate = "Please enter the valid end date of the event";
    if (startDate && new Date(startDate) < new Date())
      newErrors.validStartDate =
        "Please enter the valid start date for the event";
    if (endDate && new Date(endDate) < new Date())
      newErrors.validEndDate = "Please enter the valid end date for the event";
    if (endDate && new Date(endDate) <= new Date(startDate))
      newErrors.validEndDate = "Please enter the valid end date for the event";
    if (create && !previewImage)
      newErrors.previewImage =
        "Please enter the url of the first image for the event";
    if (!startDate)
      newErrors.noStartDate = "Please enter the start date for your event";
    if (!endDate)
      newErrors.noEnddate = "Please enter the end date for the event";
    setSubmit(false);
    setErrors(newErrors);
  }, [
    name,
    type,
    capacity,
    previewImage,
    price,
    description,
    startDate,
    endDate,
  ]);

  if (currUser === null) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);
    event = {
      ...event,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
      previewImage,
    };

    let img = {};
    if (previewImage) {
      img = {
        url: previewImage,
        preview: true,
      };
    }

    // if (Object.keys(errors).length === 0) {
    const newEvent =
      formType === "Create Event"
        ? await dispatch(createEvent(event, groupId, img))
        : await dispatch(editEvent(event));

    if (newEvent) return history.push(`/events/${newEvent.id}`);
    // } else return null;
  };

  return (
    <>
      <Navigation window={window} />
      <form onSubmit={handleSubmit} className="event-form">
        <h1>{formType}</h1>
        <label>
          Event name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
          />
        </label>
        {errors.name && (
          <p className="error-message-event-form">{errors.name}</p>
        )}
        {submit && errors.noName && (
          <p className="error-message-event-form">{errors.noName}</p>
        )}
        <label>
          Type
          <select
            className="event-form-select"
            name="attendType"
            value={type}
            onChange={(e) => setType(e.target.value)}
            // required
          >
            <option value="" disabled>
              Please select a type...
            </option>
            <option>Online</option>
            <option>In person</option>
          </select>
        </label>
        {submit && errors.type && (
          <p className="error-message-event-form">{errors.type}</p>
        )}
        <label>
          Capacity
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            // required
          />
        </label>
        {errors.capacity && (
          <p className="error-message-event-form">{errors.capacity}</p>
        )}
        {submit && errors.noCapacity && (
          <p className="error-message-event-form">{errors.noCapacity}</p>
        )}
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            // required
          />
        </label>
        {submit && errors.price && (
          <p className="error-message-event-form">{errors.price}</p>
        )}
        {errors.invalidPrice && (
          <p className="error-message-event-form">{errors.invalidPrice}</p>
        )}
        {create && (
          <label>
            Preview image
            <input
              type="url"
              value={previewImage}
              onChange={(e) => setPreviewImg(e.target.value)}
              // required
            />
          </label>
        )}
        {submit && errors.previewImage && (
          <p className="error-message-event-form">{errors.previewImage}</p>
        )}
        <label>
          Description
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // required
          />
        </label>
        {submit && errors.description && (
          <p className="error-message-event-form">{errors.description}</p>
        )}

        <label>
          {/* Start Date (i.e. 2023-11-19 20:00:00) */}
          Start Date
          {/* <input
            type="datetime"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            // required
          /> */}
          <PickDate startDate={startDate} setStartDate={setStartDate} />
        </label>
        {errors.startDate && (
          <p className="error-message-event-form">{errors.startDate}</p>
        )}
        {errors.validStartDate && (
          <p className="error-message-event-form">{errors.validStartDate}</p>
        )}
        {submit && errors.noStartDate && (
          <p className="error-message-event-form">{errors.noStartDate}</p>
        )}
        <label>
          {/* End Date (i.e. 2023-11-19 21:00:00) */}
          End Date
          {/* <input
            type="datetime"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            // required
          /> */}
          <PickDate startDate={endDate} setStartDate={setEndDate} />
        </label>
        {errors.endDate && (
          <p className="error-message-event-form">{errors.endDate}</p>
        )}
        {errors.validEndDate && (
          <p className="error-message-event-form">{errors.validEndDate}</p>
        )}
        {submit && errors.noEnddate && (
          <p className="error-message-event-form">{errors.noEnddate}</p>
        )}
        <button className="event-form-button">Submit</button>
      </form>

      <Footer window={window} />
    </>
  );
};

export default EventForm;
