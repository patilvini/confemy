import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utility/api';
import SearchIcon from '../icons/SearchIcon';
import SelectFormType3 from '../reselect/SelectFormType3';
import { alertAction } from '../../redux/alert/alertAction';
import { loadMyOrganizationsSelectListAction } from '../../redux/organization/myOrganizationsAction';

const options = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
];

export default function RefundRequests() {
  const [filterText1, setFilterText1] = useState('');
  const [filterText2, setFilterText2] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [price, setPrice] = useState('');
  const [refunds, setRefunds] = useState([]);
  const [refundList, setRefundList] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onInputChange = (e) => setSearchText(e.target.value);

  const organizationsList = useSelector(
    (state) => state.myOrganizations.organizationsListForSelect
  );

  const options2 = [{ value: 'self', label: 'User' }, ...organizationsList];

  const filterData = (data) => {
    let filteredData = data?.filter((item) => {
      if (filterText1 === '') {
        return item;
      }
      if (filterText1 === 'all') {
        return item;
      }
      if (filterText1 === 'pending' && item.creditStatus === 2) {
        return item;
      }
      if (filterText1 === 'approved' && item.creditStatus === 1) {
        return item;
      }
    });
    return filteredData;
  };

  const handleChange = (data) => {
    if (price <= data) {
      dispatch(alertAction('Approved', 'success'));
    }
    if (price > data) {
      dispatch(
        alertAction('Please select price less than actual price', 'error')
      );
    }
  };

  const searchFilter = (data, value) => {
    let filteredConfs = data?.filter((item) => {
      if (
        item.conference.title.toLowerCase().indexOf(value.toLowerCase()) >= 0
      ) {
        return item;
      }
    });

    setRefundList(filteredConfs);
  };

  const loadMyOrgnizations = async (id) => {
    try {
      const response = await api.get(
        `organizations/users/${id}?orgForConference=true`
      );

      if (response) {
        dispatch(
          loadMyOrganizationsSelectListAction(response.data?.data?.organization)
        );
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, 'danger'));
    }
  };

  let todaysUtcMiliSecond = Date.parse(new Date().toUTCString());
  const filterRefundList = (value) => {
    let filteredconfs = [];

    if (value === 'all') {
      setFilterText1(value);
    } else if (value === 'pending') {
      setFilterText1(value);
    } else if (value === 'approved') {
      setFilterText1(value);
    } else if (value === 'self') {
      setFilterText2(value);
    } else {
      setFilterText2(value);
    }
    const pendingStatusCode = false;
    const approvedStatusCode = true;

    refunds?.forEach((item) => {
      if (value === 'all') {
        if (filterText2) {
          if (filterText2 === 'self') {
            // FILTRING DATA FROM SECOND FILTER
            if (item.conference.host === 'user') {
              filteredconfs.push(item);
            }
          } else {
            // FILTER DATA IF SECOND FILTER WILL BE ORG FILTER
            if (item?.conference?.hostedBy?.organization === filterText2) {
              filteredconfs.push(item);
            }
          }
        } else {
          // IF SECOND FILTER IS NOT APPLIED
          filteredconfs = refunds;
        }
      } else if (value === 'pending') {
        if (item.refunded == pendingStatusCode) {
          if (filterText2) {
            if (filterText2 === 'self') {
              // FILTRING DATA FROM SECOND FILTER
              if (
                item.conference.host === 'user' &&
                item.refunded === pendingStatusCode
              ) {
                filteredconfs.push(item);
              }
            } else if (
              item?.conference.hostedBy?.organization === filterText2
            ) {
              filteredconfs.push(item);
            }
          } else {
            filteredconfs.push(item);
          }
        }
      } else if (value === 'approved') {
        if (item.refunded == approvedStatusCode) {
          if (filterText2) {
            if (filterText2 === 'self') {
              // FILTRING DATA FROM SECOND FILTER
              if (item.conference.host === 'user') {
                filteredconfs.push(item);
              }
            } else if (item?.conference.hotedBy?.organization === filterText2) {
              filteredconfs.push(item);
            }
          } else {
            filteredconfs.push(item);
          }
        }
      } else if (value === 'self') {
        if (item.conference.host === 'user') {
          if (filterText1) {
            if (filterText1 === 'pending') {
              if (
                item.conference.host === 'user' &&
                item.refunded === pendingStatusCode
              ) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === 'approved') {
              if (
                item.conference.host === 'user' &&
                item.refunded === approvedStatusCode
              ) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === 'all') {
              filteredconfs.push(item);
            }
          } else {
            console.log('rinnn');
            filteredconfs.push(item);
          }
        }
      } else {
        if (item?.conference.hostedBy?.organization === value) {
          if (filterText1) {
            if (filterText1 === 'pending') {
              if (item.refunded === pendingStatusCode) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === 'approved') {
              if (item.refunded === approvedStatusCode) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === 'all') {
              filteredconfs.push(item);
            }
          } else {
            filteredconfs.push(item);
          }
        }
      }
    });

    setFilteredList(filteredconfs);

    searchText
      ? searchFilter(filteredconfs, searchText)
      : setRefundList(filteredconfs);
  };

  const getRefundsData = async (userId) => {
    try {
      const response = await api.get(
        `organizers/${userId}/conferences/refunds`
      );
      if (response) {
        setFilteredList(response.data.data.refundDetails);
        setRefundList(response.data.data.refundDetails);
        setRefunds(response.data.data.refundDetails);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getRefundsData(user._id);
    loadMyOrgnizations(user._id);
  }, [user._id]);

  useEffect(() => {
    searchFilter(filteredList, searchText);
  }, [searchText]);

  return (
    <div>
      <div className="flex-vc-sb">
        <h1>Refund Requests</h1>
        <div className="flex-vc-sb ">
          <div className="form-type-3 mr-4" style={{ width: '50%' }}>
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
                    ? 'display-none'
                    : 'conf-search-input-icon'
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
              onChange={(value) => filterRefundList(value?.value)}
              value={filterText1}
              placeholder="Filter"
              isDisabled={false}
              isMulti={false}
            />
          </div>
          <div>
            <SelectFormType3
              id="filterText1"
              isClearable
              isSearchable
              name="filuterText1"
              options={options2}
              onChange={(value) => filterRefundList(value?.value)}
              value={filterText1}
              placeholder="Filter"
              isDisabled={false}
              isMulti={false}
            />
          </div>
        </div>
      </div>
      <div className="mt-24">
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
            {refundList?.map((val) => {
              return (
                <tr key={val._id}>
                  <td>{`${val.firstName} ${val.lastName}`}</td>
                  <td>{val?.conference?.title}</td>
                  <td>{val.bookedBy}</td>
                  <td>{val.registrationNumber}</td>
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
    </div>
  );
}
