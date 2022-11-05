import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import OpeneyeIcon from "../icons/OpenEyeIcon";
import Switch from "./Switch";
import TextEditor from "../text-editor/TextEditor";
import TicketForm from "../tickets/TicketForm";
import Modal from "../modal/Modal";
import NextIcon from "../icons/NextIcon";

export default function CreateTickets({ formik, setFormikFieldValue }) {
  const [open, setOpen] = useState(false);
  const [isFreeTicket, setIsFreeTicket] = useState(false);

  const newConference = useSelector((state) => state.conference.newConference);

  function onOpen() {
    setOpen(true);
  }

  return (
    <div>
      <div className="mb-72">
        <h4 className="mb-32">
          {formik.values.isFree
            ? "For free conference, create one free ticket."
            : "For conference which is not free, create first ticket at base price and provide how many tickets at base price are available. Add additional tickets at different prices with quantities as needed."}
        </h4>

        <div>
          {newConference?.tickets?.length > 0 && (
            <div className="conftickets-table-wrap mb-24">
              <h4 className="mb-16">My tickets</h4>
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Pass</th>
                    <th>QTY</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newConference?.tickets?.map((ticket) => {
                    return (
                      <tr key={ticket._id}>
                        <td>{ticket.name}</td>
                        <td>{ticket.quantity}</td>
                        <td>
                          {ticket.type === "FREE"
                            ? "Free"
                            : `${ticket.currency} ${ticket.price}`}
                        </td>
                        <td>
                          <span>
                            <i>
                              <EditIcon className="icon-size" />
                            </i>
                          </span>
                          <span className="mx-16">
                            <i>
                              <DeleteIcon
                                className="icon-size"
                                fill="#757575"
                              />{" "}
                            </i>
                          </span>
                          <span>
                            <i>
                              <OpeneyeIcon className="icon-size" />
                            </i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <button
            type="button"
            className="button button-primary mb-40"
            onClick={onOpen}
          >
            {/* if baseTicket Created, change label to Create More Tickets */}
            {newConference?.isFree
              ? "Create Free Ticket"
              : newConference.isRegularTicketCreated
              ? "Create more tickets"
              : "Create ticket at baseprice"}
          </button>
        </div>
      </div>
      {!formik.values.isFree && newConference?.tickets?.length > 0 && (
        <div className="mb-72">
          <h2>Refund Policy</h2>
          <div className="flex-vc mb-24">
            <p className="caption-1-regular-gray3 mr-16">
              Is the conference refundable?
            </p>
            <Switch
              id="isRefundable"
              name="isRefundable"
              value="isRefundable"
              checked={formik.values.isRefundable}
              onChange={formik.handleChange}
              disable={formik.values.isFree}
            />
          </div>

          <div
            className={`${formik.values.isRefundable ? "" : "display-none"}`}
          >
            <TextEditor
              setFormikFieldValue={setFormikFieldValue}
              fieldName="refundDescription"
              apiRawContent={newConference?.refundDescription}
            />
          </div>
        </div>
      )}
      {open && (
        <Modal>
          <div className="ticket-form-container white-modal">
            <div className="modal-form-wrapper">
              <TicketForm
                isFreeTicket={isFreeTicket}
                isFree={formik.values.isFree}
                onClose={() => setOpen(false)}
              />
              <div
                className={
                  formik.values.isFree || !newConference?.isRegularTicketCreated
                    ? "display-none"
                    : null
                }
              >
                <div className="caption-1-regular-cblack or-container">
                  <span className="or-line"></span> OR{" "}
                  <span className="or-line"></span>
                </div>
                <div className="flex-vchc">
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsFreeTicket((prev) => !prev);
                    }}
                    className="caption-1-heavy-primary"
                  >
                    {isFreeTicket
                      ? "Create paid tier ticket"
                      : "Create Free tier ticket for paid conference"}
                  </p>
                  <NextIcon />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
