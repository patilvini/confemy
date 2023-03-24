import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/Modal";

import TicketForm from "../tickets/TicketForm";
import TicketOptions from "../tickets/TicketOptions";
import TicketContext from "../tickets/ticketContext";
import PlaneTickets from "../SVG-assets/PlaneTickets";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import OpeneyeIcon from "../icons/OpenEyeIcon";

export default function OConferenceTickets() {
  const [isTicketFree, setIsTicketFree] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showTicketOptions, setShowTicketOptions] = useState(false);

  const newConference = useSelector((state) => state.conference.newConference);
  const dispatch = useDispatch();

  function onClose() {
    setOpen(false);
    setShowTicketForm(false);
    setShowTicketOptions(false);
  }

  function onOpen() {
    setOpen(true);
    setShowTicketOptions(true);
  }

  function showTicketsOptions() {
    setOpen(true);
    setShowTicketOptions(true);
  }

  return (
    <div>
      {newConference?.tickets?.length > 0 ? (
        <div>
          <div className="conftickets-table-wrap">
            <h2 className="mb-32">Tickets</h2>
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
                        {ticket.currency} {ticket.price}
                      </td>
                      <td>
                        <span>
                          <i>
                            <EditIcon className="icon-size" />
                          </i>
                        </span>
                        <span className="mx-16">
                          <i>
                            <DeleteIcon className="icon-size" fill="#757575" />{" "}
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
          <button className="button button-primary mt-52" onClick={onOpen}>
            Create Tickets
          </button>
        </div>
      ) : (
        <div className="conf-notickets-container">
          <PlaneTickets className="planeticket-icon-size" />
          <h2>Let's create Tickets</h2>
          <button
            onClick={onOpen}
            type="button"
            className="button button-primary"
          >
            Add Ticket
          </button>
        </div>
      )}
      <TicketContext.Provider value={{ isTicketFree, setIsTicketFree }}>
        {open && (
          <Modal>
            <div className="white-modal">
              <div className="modal-form-wrapper">
                {showTicketOptions ? (
                  <TicketOptions
                    onClose={onClose}
                    setShowTicketForm={setShowTicketForm}
                    setShowTicketOptions={setShowTicketOptions}
                  />
                ) : (
                  showTicketForm && (
                    <TicketForm
                      onClose={onClose}
                      setShowTicketForm={setShowTicketForm}
                      setShowTicketOptions={setShowTicketOptions}
                    />
                  )
                )}
              </div>
            </div>
          </Modal>
        )}
      </TicketContext.Provider>
    </div>
  );
}
