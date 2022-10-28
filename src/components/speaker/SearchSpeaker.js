import { Formik } from "formik";
import SearchAndAdd from "../reselect/SearchAndAdd";
import "./searchSpeaker.styles.scss";

export default function SearchSpeaker(props) {
  return (
    <div className="register-modal white-modal">
      <div className="modal-form-wrapper">
        <div className="search-speaker-wrap">
          <div style={{ flexGrow: 1 }}>
            <h2 className="flex-vchc mb-40">Search and add speaker</h2>
            <div>
              <SearchAndAdd
                options={props.options}
                label={props.label}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                isMulti={props.isMulti}
                showForm={props.showForm}
              />
            </div>
          </div>
          <div className="flex">
            <button
              type="button"
              className="button button-primary mr-8"
              onClick={() => {
                const SpeakerToAdd = props.options?.find(
                  (option) => option.value === props.value
                );
                props.setFormikSpeakers(SpeakerToAdd);
                props.onClose();
              }}
            >
              Add
            </button>
            <button
              type="button"
              className="button-outlined button-outlined-green ml-8"
              onClick={props.onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
