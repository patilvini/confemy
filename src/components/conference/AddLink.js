import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import api from "../../utility/api";
import TextError from "../formik/TextError";

const validationSchema = yup.object({
  links: yup.array(),
});

export default function AddLink({ source, active }) {
  const dispatch = useDispatch();

  const conferenceId = useSelector(
    (state) => state.conference.newConference._id
  );
  const conference = useSelector((state) => state.conference.newConference);
  // console.log(conference.resourceLinks)

  let initialValues = {
    links: conference?.resourceLinks || [{ title: "", url: "" }],
  };

  const onDelete = async () => {
    try {
      const r = await api.post(
        "/conferences/step4/resources?resourceStatus=links",
        {
          resourceLinks: {
            links: [{ title: "", url: "" }],
          },
          conferenceId: conferenceId,
        }
      );

      console.log(r);
      dispatch(createConferenceAction(r.data.data.conference));
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (values, actions) => {
    console.log("form on submit", values);

    const resourceLinks = {
      links: values.links,
      conferenceId: conferenceId,
    };

    try {
      const r = await api.post(
        "/conferences/step4/resources?resourceStatus=links",
        {
          resourceLinks: {
            links: resourceLinks.links,
          },
          conferenceId: conferenceId,
        }
      );
      console.log("added links", r);
      dispatch(createConferenceAction(r.data.data.conference));
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <div className="conf-form-wrap ">
      {source === active && (
        <div>
          <div className="opposite-grid">
            <h1>Add Links</h1>
            <div style={{ width: "50%" }}>
              {" "}
              <button onClick={() => onDelete()} className="button button-red">
                Delete All
              </button>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <FieldArray
                name="links"
                render={(arrayHelpers) => (
                  <div className="form-type-1">
                    {arrayHelpers.form.values.links.map((item, index) => (
                      <div key={index}>
                        {/** both these conventions do the same */}
                        <div>
                          <div className="material-textfield">
                            <Field
                              style={{ margin: "2rem 0" }}
                              type="text"
                              name={`links[${index}].title`}
                              placeholder=" "
                            />
                            <label>Enter title here</label>
                          </div>
                          {/* {arrayHelpers.touched.link && Boolean(arrayHelpers.errors.link) && (
            <TextError>{arrayHelpers.errors.link}</TextError>
          )} */}
                        </div>
                        <div>
                          <div className="material-textfield">
                            <Field
                              style={{ margin: "2rem 0" }}
                              type="text"
                              name={`links[${index}].url`}
                              placeholder=" "
                            />
                            <label>Enter url here</label>
                          </div>
                          {/* {arrayHelpers.touched.link && Boolean(arrayHelpers.errors.link) && (
            <TextError>{arrayHelpers.errors.link}</TextError>
          )} */}
                        </div>

                        <div
                          style={{ margin: "2rem 0" }}
                          className="flex-container"
                        >
                          <button
                            style={{ margin: "0rem 2rem 2rem 0" }}
                            className="button button-red "
                            type="button"
                            onClick={() => {
                              // console.log(arrayHelpers.form.values.links.length)

                              if (arrayHelpers.form.values.links.length > 1) {
                                arrayHelpers.remove(index);
                              }
                            }}
                          >
                            -
                          </button>
                          <button
                            style={{ margin: "0rem 2rem 2rem 0" }}
                            className="button button-green "
                            type="button"
                            onClick={() => {
                              console.log(arrayHelpers.form.values);
                              arrayHelpers.push({ title: "", url: "" });
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              />

              <button className="button button-primary " type="submit">
                Save
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}
