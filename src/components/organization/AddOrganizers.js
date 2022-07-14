import { Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";

import api from "../../utility/api";
import TextInput from "../formik/TextInput";

const validationSchema = yup.object({
  email: yup.string().required("Required"),
});

const initialValues = {
  email: "",
};

export default function AddOrganizers() {
  const [organization, setOrganization] = useState([]);
  const organizationID = useParams().organizationId;
  const userID = useSelector((state) => state.auth.user._id);
  const [organizers, setOrganizers] = useState([]);
  const [hasOrgs, setHasOrgs] = useState(false)

  

  useEffect(() => {
    
 const callApi = async () => {
  try{
    const r =  await api.get("/organizations/organizers/" + organizationID + "?userId=" + userID)
    setOrganizers(r.data.data.organizers)
    console.log(r.data.data.organizers)
   
   

  } catch(err){
    console.log(err)
  }

}

callApi()
    

      
      
  }, []);

  const onSubmit = async (values, actions) => {
    const organizerDetails = {
      email: values.email,
      organizationId: organizationID,
    };

    try {
      const res = await api.post("/organizations/organizers", {
        organizerDetails,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    // console.log("form values form onSubmit", values);
  };

  console.log(hasOrgs)

  return (
    <>
    <h2>Organizers</h2>
    <div>
        
          { organizers.map((i)=>{
           
            return(
                <ul key={i._id}>
                   <li><p>{i.user.email}</p></li>  
                

                </ul>
            )
        })}

        
    </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <TextInput name="email" type="email" placeholder="Enter email" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
