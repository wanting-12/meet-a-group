import "./DatePicker.css";
import DatePicker from "react-datepicker";
import "react-calendar/dist/Calendar.css";

const range = (start, stop, step) => {
  let result = [];
  while (start <= stop) {
    result.push(start);
    start += step;
  }
  return result;
};

const PickDate = ({ startDate, setStartDate }) => {
  const years = range(
    new Date().getFullYear(),
    new Date().getFullYear() + 100,
    1
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <DatePicker
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div
          style={{
            margin: 10,
            padding: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      dateFormat={"MM/d/yyyy h:mm aa"}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      timeCaption="time"
      isClearable
      placeholderText="Please enter the date"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={new Date()}
    />
  );
};

export default PickDate;
