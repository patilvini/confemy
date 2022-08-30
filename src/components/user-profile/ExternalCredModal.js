import Modal from "../modal/Modal";
import { useFormik } from "formik";


export default function ExternalCredModal ({onDismiss}){
    // const formik = useFormik({
    //     initialValues: initialValues,
    //     validationSchema: validationSchema,
    //     onSubmit: onSubmit,
    //   });
    return (
      //   <Modal onDismiss={onDismiss}>
      //       <div className="register-modal white-modal">
      //       <div className="modal-form-wrapper">
      //         <form onSubmit={formik.handleSubmit} className="form-type-1">
      //           <div className="flex-container">
      //             <div className="flex-item">
      //               <button
      //                 type="button"
      //                 id="free"
      //                 name="type"
      //                 value="FREE"
      //                 className="button button-primary"
      //                 onClick={() => {
      //                   formik.setFieldValue("type", "FREE");
      //                   formik.setFieldValue("currency", "none");
      //                   formik.setFieldValue("price", 0);

      //                   setdisabled(true);
      //                 }}
      //               >
      //                 Free
      //               </button>
      //             </div>
      //             <div className="flex-item">
      //               <button
      //                 type="button"
      //                 id="paid"
      //                 name="type"
      //                 className="button button-green"
      //                 value="PAID"
      //                 onClick={() => {
      //                   formik.setFieldValue("type", "PAID");
      //                   setdisabled(false);
      //                 }}
      //               >
      //                 Paid
      //               </button>
      //             </div>
      //           </div>

      //           <div className="input-container">
      //             <input
      //               onChange={formik.handleChange}
      //               name="passName"
      //               type="text"
      //               placeholder="Pass Name"
      //             />
      //             {formik.touched.passName &&
      //               Boolean(formik.errors.passName) && (
      //                 <TextError>{formik.errors.passName}</TextError>
      //               )}
      //           </div>
      //           <div className="input-container">
      //             <input
      //               onChange={formik.handleChange}
      //               name="passInfo"
      //               type="text"
      //               placeholder="Pass Info"
      //             />
      //             {formik.touched.passInfo &&
      //               Boolean(formik.errors.passInfo) && (
      //                 <TextError>{formik.errors.passInfo}</TextError>
      //               )}
      //           </div>
      //           <div className="input-container">
      //             <input
      //               onChange={formik.handleChange}
      //               name="quantity"
      //               type="text"
      //               placeholder="Available Quantity"
      //             />
      //             {formik.touched.quantity &&
      //               Boolean(formik.errors.quantity) && (
      //                 <TextError>{formik.errors.quantity}</TextError>
      //               )}
      //           </div>

      //           <div className="input-container">
      //             <Select
      //               isDisabled={disabled}
      //               label="currency"
      //               name="currency"
      //               options={currencies}
      //               onChange={(value) => {
      //                 console.log("value from onchange handler", value.value);
      //                 formik.setFieldValue("currency", value.value);
      //               }}
      //             />
      //             {formik.touched.currency &&
      //               Boolean(formik.errors.currency) && (
      //                 <TextError>{formik.errors.currency}</TextError>
      //               )}
      //           </div>

      //           <div className="input-container">
      //             <input
      //               onChange={formik.handleChange}
      //               name="price"
      //               type="number"
      //               placeholder="Price"
      //               disabled={disabled}
      //             />
      //             {formik.touched.price && Boolean(formik.errors.price) && (
      //               <TextError>{formik.errors.price}</TextError>
      //             )}
      //           </div>
      //           <div className="input-container">
      //             <input
      //               type="date"
      //               name="saleStartDate"
      //               onChange={formik.handleChange}
      //             />
      //             {formik.touched.saleStartDate &&
      //               Boolean(formik.errors.saleStartDate) && (
      //                 <TextError>{formik.errors.saleStartDate}</TextError>
      //               )}
      //           </div>

      //           <div className="flex-container">
      //             <div className="flex-item">
      //               <button
      //                 className="button button-secondary"
      //                 type="button"
      //                 onClick={() => setVisibitly(false)}
      //               >
      //                 Cancel
      //               </button>
      //             </div>
      //             <div className="flex-item">
      //               <button className="button button-primary" type="submit">
      //                 Submit
      //               </button>
      //             </div>
      //           </div>
      //         </form>
      //       </div>
      //     </div>
        

      //  </Modal>
      <div></div>
    )
}