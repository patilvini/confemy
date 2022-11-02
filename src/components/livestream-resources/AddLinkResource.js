import { Fragment } from "react";
import { Formik, Form, Field, FieldArray, getIn, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { alertAction } from "../../redux/alert/alertAction";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import api from "../../utility/api";
import TextError from "../formik/TextError";
import AddIcon from "../icons/AddIcon";
import DeleteIcon from "../icons/DeleteIcon";

import "./addLinkResource.styles.scss";
// formik context

const validationSchema = yup.object({
  links: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Please Add the title"),
      url: yup.string().required("Please Add the URL"),
    })
  ),
});

export default function AddLinkResource({ source, active }) {
  const dispatch = useDispatch();

  const newConference = useSelector((state) => state.conference.newConference);

  const initialValues = {
    links: newConference?.resourceLinks || [{ title: "", url: "" }],
  };

  const onDelete = async () => {
    const url = "/conferences/step4/resources?resourceStatus=links";
    const formData = {
      resourceLinks: {
        links: [],
      },
      conferenceId: newConference?._id,
    };
    try {
      const response = await api.post(url, formData);
      dispatch(createConferenceAction(response.data.data.conference));
      dispatch(alertAction(response.data.message, "success"));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const onSubmit = async (values, actions) => {
    console.log("form on submit", values);
    console.log(actions);

    const url = "/conferences/step4/resources?resourceStatus=links";
    const formData = {
      resourceLinks: {
        links: values.links,
      },
      conferenceId: newConference?._id,
    };

    try {
      const response = await api.post(url, formData);
      console.log("added links", response);
      dispatch(createConferenceAction(response.data.data.conference));
      dispatch(alertAction(response.data.message, "success"));
      actions.resetForm({ values: initialValues });
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  return (
    <div>
      {/* <h2 className="mb-32">Saved links</h2> */}
      {/* <div className="link-resource-container mb-72">
        {newConference?.resourceLinks?.map((link) => (
          <div className="body-bold mb-16" key={link.title}>
            <a href={link.url}> {link.title} </a>
          </div>
        ))}
      </div> */}
      <div className="conf-form-wrap ">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          <Form className="form-type-1">
            <h2>Links</h2>
            {/* <div>
             
              <div style={{ width: "50%" }}>
                {newConference?.resourceLinks?.[0]?.title?.length > 0 && (
                  <button
                    onClick={() => {
                      onDelete();
                    }}
                    type="reset"
                    className="delete-button-icon"
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </div> */}

            <FieldArray
              name="links"
              render={(arrayHelpers) => (
                <div>
                  <div className="link-resource-grid">
                    {arrayHelpers.form.values.links?.map((link, index) => (
                      <Fragment key={index}>
                        {/*  */}
                        <div className="grid-1st-col">
                          <div className="material-textfield">
                            <Field
                              type="text"
                              name={`links[${index}].title`}
                              placeholder=" "
                            />
                            <label>Title for url </label>
                          </div>
                          <ErrorMessage
                            name={`links[${index}].title`}
                            component={TextError}
                          />
                          <div className="material-textfield mt-8">
                            <Field
                              type="text"
                              name={`links[${index}].url`}
                              placeholder=" "
                            />
                            <label>URL</label>
                          </div>
                          <ErrorMessage
                            name={`links[${index}].url`}
                            component={TextError}
                          />
                        </div>
                        {/*  */}
                        <div className="grid-2nd-col flex-vchc">
                          <div>
                            {arrayHelpers.form.values.links.length > 1 ? (
                              <i
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <DeleteIcon className="icon-lg" />
                              </i>
                            ) : null}
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <button
                    className="button button-green flex-vc mt-16 mb-72 p-4"
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        title: "",
                        url: "",
                      })
                    }
                  >
                    <AddIcon className="icon-sm mr-8" fill="#fff" />
                    <span>Add more</span>
                  </button>
                </div>
              )}
            />

            <button className="button button-primary " type="submit">
              Save Data
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
