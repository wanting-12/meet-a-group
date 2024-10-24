import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createGroup, editGroupThunk } from "../../store/group";
import Footer from "../Footer";
import Navigation from "../Navigation";
import "./GroupForm.css";

const GroupForm = ({ group, formType }) => {
  const history = useHistory();
  const currUser = useSelector((state) => state.session.user);
  let privacy;
  if (group.private === true) privacy = "Private";
  else if (group.private === false) privacy = "Public";
  else privacy = "";

  const [name, setName] = useState(group.name);
  const [about, setAbout] = useState(group.about);
  const [type, setType] = useState(group.type);
  const [isPrivate, setPrivate] = useState(privacy);
  const [city, setCity] = useState(group.city);
  const [state, setState] = useState(group.state);
  const [previewImage, setPreviewImg] = useState(group.previewImage);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  let create = formType === "Create Group" ? true : false;

  const dispatch = useDispatch();

  useEffect(() => {
    const newErrors = {};
    if (name && name.length > 60)
      newErrors.name = "Name must be 60 characters or less";
    if (!name) newErrors.noName = "Please enter the name for your group";
    if (about && about.length < 50)
      newErrors.about = "About must be 50 characters or more";
    if (!about)
      newErrors.noAbout = "Please enter the description for your group";
    if (type !== "Online" && type !== "In person")
      newErrors.noType = "Please select the type for your group";
    if (
      isPrivate !== true &&
      isPrivate !== false &&
      isPrivate !== "Public" &&
      isPrivate !== "Private"
    )
      newErrors.noIsPrivate = "Please select the privacy for your group";
    if (create && !previewImage)
      newErrors.previewImg = "Please upload the first image for your group";
    if (!city) newErrors.noCity = "Please set the city for your group";
    if (!state) newErrors.noState = "Please set the state for your group";

    setSubmit(false);
    setErrors(newErrors);
  }, [name, about, type, isPrivate, previewImage, city, state]);

  if (currUser === null) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);
    let priv;
    if (isPrivate === "Public") priv = false;
    else if (isPrivate === "Private") priv = true;

    group = {
      ...group,
      name,
      about,
      type,
      private: priv,
      city,
      state,
    };

    let img = {};
    if (previewImage?.length > 0) {
      img = {
        url: previewImage,
        preview: true,
      };
    }

    // setErrors([]);

    const newGroup =
      formType === "Create Group"
        ? await dispatch(createGroup(group, img))
        : await dispatch(editGroupThunk(group, group.id));

    if (newGroup) return history.push(`/groups/${newGroup.id}`);
  };

  // console.log(errors);

  return (
    <>
      <Navigation window={window} />
      <form onSubmit={handleSubmit} className="group-form">
        <h1>{formType}</h1>
        <label>
          Group name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
          />
        </label>
        {errors.name && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.name}</li>
          </ul>
        )}
        {submit && errors.noName && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.noName}</li>
          </ul>
        )}
        <label>
          About
          <textarea
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            // required
          />
        </label>
        {errors.about && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.about}</li>
          </ul>
        )}
        {submit && errors.noAbout && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.noAbout}</li>
          </ul>
        )}
        <label className="group-label-type">
          Type
          <select
            name="attendType"
            value={type}
            onChange={(e) => setType(e.target.value)}
            // required
          >
            <option value="" disabled>
              Please select a type...
            </option>
            <option key={"Online"}>Online</option>
            <option key={"In person"}>In person</option>
          </select>
        </label>
        {/* {errors.type && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.type}</li>
          </ul>
        )} */}
        {submit && errors.noType && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.noType}</li>
          </ul>
        )}
        <label>
          Private or public?
          <select
            name="privacy"
            value={isPrivate}
            onChange={(e) => setPrivate(e.target.value)}
            // required
          >
            <option value="" disabled>
              Please select...
            </option>
            <option key={"Private"}>Private</option>
            <option key={"Public"}>Public</option>
          </select>
          {/* {errors.isPrivate && (
            <ul className="error-messages-group-form">
              <li className="error-detail-group-form">{errors.isPrivate}</li>
            </ul>
          )} */}
          {submit && errors.noIsPrivate && (
            <ul className="error-messages-group-form">
              <li className="error-detail-group-form">{errors.noIsPrivate}</li>
            </ul>
          )}
        </label>
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
        {/* {errors.previewImg && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.previewImg}</li>
          </ul>
        )} */}
        {submit && errors.previewImg && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.previewImg}</li>
          </ul>
        )}
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            // required
          />
        </label>
        {/* {errors.city && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.city}</li>
          </ul>
        )} */}
        {submit && errors.noCity && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.noCity}</li>
          </ul>
        )}
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            // required
          />
        </label>
        {/* {errors.state && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.state}</li>
          </ul>
        )} */}
        {submit && errors.noState && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.noState}</li>
          </ul>
        )}
        <button className="group-form-button">Submit</button>
      </form>
      <Footer window={window} />
    </>
  );
};

export default GroupForm;
