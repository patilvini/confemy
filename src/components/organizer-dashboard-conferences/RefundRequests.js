import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utility/api";
import SearchIcon from "../icons/SearchIcon";
import SelectFormType3 from "../reselect/SelectFormType3";
import { alertAction } from "../../redux/alert/alertAction";

const options = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
];

export default function RefundRequests() {
  const [formData, setFormData] = useState({
    searchText: "",
  });
  const [filterText1, setFilterText1] = useState("");
  const [price, setPrice] = useState(null);
  const [refunds, setRefunds] = useState([]);

  const { searchText } = formData;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const searchData = (data) => {
    if (data) {
      const dataSet = data?.filter((item) => {
        if (
          item.firstName
            .toLowerCase()
            .indexOf(searchText.toLocaleLowerCase()) >= 0
        ) {
          return item;
        }
      });
      return dataSet;
    }
  };

  const filterData = (data) => {
    let filteredData = data?.filter((item) => {
      if (filterText1 === "") {
        return item;
      }
      if (filterText1 === "all") {
        return item;
      }
      if (filterText1 === "pending" && item.creditStatus === 2) {
        return item;
      }
      if (filterText1 === "approved" && item.creditStatus === 1) {
        return item;
      }
    });
    return filteredData;
  };

  const handleChange = (data) => {
    if (price <= data) {
      dispatch(alertAction("Approved", "success"));
    }
    if (price > data) {
      dispatch(
        alertAction("Please select price less than actual price", "error")
      );
    }
  };

  const getRefundsData = async (userId) => {
    try {
      const response = await api.get(
        `organizers/${userId}/conferences/refunds`
      );
      if (response) {
        console.log("response", response);
        setRefunds(response.data.data.refundDetails);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getRefundsData(user._id);
  }, [user._id]);

  return (
    <>
      <div className="org-refund-grid-1">
        <h1>Refund Requests</h1>
        <div className="org-refund-grid-2">
          <div className="form-type-3">
            <div className="position-relative ">
              <input
                type="text"
                id="searchtickets"
                placeholder="Search Credits"
                name="searchText"
                value={searchText}
                onChange={onInputChange}
              />
              <i
                className={
                  searchText?.length > 0
                    ? "display-none"
                    : "conf-search-input-icon"
                }
              >
                <SearchIcon width="2.4rem" height="2.4rem" />
              </i>
            </div>
          </div>
          <div>
            <SelectFormType3
              id="filterText1"
              isClearable
              isSearchable
              name="filuterText1"
              options={options}
              onChange={(value) => setFilterText1(value?.value)}
              value={filterText1}
              placeholder="Filter"
              isDisabled={false}
              isMulti={false}
            />
          </div>
        </div>
      </div>
      <div className="mt-24 " style={{ overflowX: "scroll" }}>
        <table className="org-refund-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Conference</th>
              <th>Booked</th>
              <th>Registration</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {searchData(filterData(refunds))?.map((val) => {
              return (
                <tr key={val._id}>
                  <td>{`${val.firstName} ${val.lastName}`}</td>
                  <td>
                    {/* {val.conference.title} */}
                    test 1234
                  </td>
                  <td>{val.bookedBy}</td>
                  <td>#{val.registrationNumber}</td>
                  <td>
                    <div className="form-type-3 flex-vc">
                      <div className="material-textfield">
                        <input
                          id="title"
                          type="text"
                          name="title"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder=" "
                        />
                      </div>
                      <button
                        className="refund-approve-btn ml-16"
                        onClick={() => handleChange(val.price)}
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
