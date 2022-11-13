import { FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import { ModalData, ModalProps, ScheduleType } from "./Modal.types";
import "./Modal.css";

export const Modal = (props: ModalProps) => {
  const [schedule, setSchedule] = useState<ScheduleType>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    const target = e?.target as unknown as Record<
      string,
      Record<"value", string>
    >;
    const currentSchedule = target.schedule.value;

    let modalData: ModalData = {
      reportName: target.reportName.value,
      format: target.format.value,
      email: target.email.value,
      schedule: currentSchedule,
      specificDate:
        currentSchedule === "specific date"
          ? currentSchedule && {
              date: target.date?.value,
              time: target.time?.value,
            }
          : "",
      everydayAt:
        currentSchedule === "daily"
          ? currentSchedule && { time: target.time?.value }
          : "",
      weekly:
        currentSchedule === "weekly"
          ? { date: target.weekday?.value, time: target.time?.value }
          : "",
    };

    props.onSubmitClick(modalData);
    props.onCancelClick();
  };

  const handleScheduleChange = (val: any) => {
    console.log(val);
  };

  return ReactDOM.createPortal(
    <div id="modal__container">
      <span style={{ marginLeft: "30px", lineHeight: "35px" }}>
        Export Report
      </span>
      <div id="modal__content">
        <form
          onSubmit={handleSubmit}
          id="form__content"
          action="https://jsonplaceholder.typicode.com/posts"
        >
          <div className="form__entry">
            <span className="form__label">Report name</span>
            <input
              className="form__input form__text__input"
              type="text"
              name="reportName"
              placeholder="Shareable Report"
            />
          </div>
          <div className="form__entry">
            <span className="form__label">Format</span>
            <div className="form__radio__group form__input">
              <label>
                <input type="radio" name="format" value="Excel" />
                Excel
              </label>
              <br />
              <label>
                <input type="radio" name="format" value="CSV" />
                CSV
              </label>
              <br />
            </div>
          </div>
          <div className="form__entry">
            <span className="form__label">E-mail to</span>
            <input
              className="form__input form__text__input"
              type="text"
              placeholder="client@company.com"
              name="email"
            />
          </div>
          <div className="form__entry">
            <span className="form__label">Schedule</span>
            <div
              className="form__radio__group form__input"
              onChange={(e) => setSchedule((e.target as any).value)}
            >
              <label>
                <input type="radio" name="schedule" value="no repeat" />
                No Repeat
              </label>
              <br />
              <label>
                <input type="radio" name="schedule" value="specific date" />
                Specific Date
              </label>
              <br />
              <label>
                <input type="radio" name="schedule" value="daily" />
                Daily
              </label>
              <br />
              <label>
                <input type="radio" name="schedule" value="weekly" />
                Weekly
              </label>
              <br />
            </div>
          </div>
          {(schedule === null || schedule === "no repeat") && (
            <div className="form__spacer"></div>
          )}
          {schedule === "specific date" && (
            <div className="form__entry">
              <span className="form__label">Date</span>
              <div className="form__input">
                <input name="date" className="form__text__input" type="date" />
                <span
                  className="form__label"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  at
                </span>
                <input name="time" className="form__text__input" type="time" />
              </div>
            </div>
          )}
          {schedule === "daily" && (
            <div className="form__entry">
              <span className="form__label">Everyday at</span>
              <div className="form__input">
                <input name="time" className="form__text__input" type="time" />
              </div>
            </div>
          )}
          {schedule === "weekly" && (
            <div className="form__entry">
              <span className="form__label">Date</span>
              <div className="form__input">
                <select
                  className="form__select__input"
                  defaultValue="Wednesday"
                  name="weekday"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <span
                  className="form__label"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  at
                </span>
                <input name="time" className="form__text__input" type="time" />
              </div>
            </div>
          )}
          <hr className="horizontal__line" />
          <div id="form__submit__tab">
            <button
              className="form__button form__cancel__button"
              onClick={props.onCancelClick}
            >
              Cancel
            </button>
            <input
              className="form__button form__submit__button"
              type="submit"
              value="OK"
            />
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};
