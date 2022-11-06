import { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import OpeneyeIcon from "../icons/OpenEyeIcon";
import Switch from "../switch/Switch";
import TextEditor from "../text-editor/TextEditor";
import TicketForm from "../tickets/TicketForm";
import Modal from "../modal/Modal";

export default function CreateTickets({ formik, setFormikFieldValue }) {
  const [open, setOpen] = useState(false);

  const newConference = useSelector((state) => state.conference.newConference);

  function onOpen() {
    setOpen(true);
  }

  return (
    <div>
      <div className="mb-72">
        <h4 className="mb-32">
          First ticket will be created at base price or regular price. For free
          conferences, set baseprice as zero. Base price will be used as price
          of the conference for search criteria. Conference with base price set
          at zero is considered as a free conference. After base price ticket is
          created, one can add additional tickets at different prices with
          quantities as needed.
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
                          {ticket.currency && ticket.price === 0
                            ? "FREE"
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
            {newConference.isRegularTicketCreated
              ? "Create more tickets"
              : "Create ticket at base price"}
          </button>
        </div>
      </div>
      {newConference?.tickets?.length > 0 && (
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
              <TicketForm onClose={() => setOpen(false)} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
