import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertAction } from '../../redux/alert/alertAction';
import { formatInTimeZone } from 'date-fns-tz';
import enGB from 'date-fns/locale/en-GB';

import SetGoalModal from './SetGoalModal';
import ModalX from '../modal/ModalX';

import EditIcon from '../icons/EditIcon';
import { loadUserTotalCreditsAction } from '../../redux/user-profile/userProfileAction';

import api from '../../utility/api';
import SelectFormType3 from '../reselect/SelectFormType3';

const CreditsTable = (allCredits) => {
  const totalCredits = useSelector(
    (state) => state.userProfile.userTotalCredits
  );

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [singleCredit, setSingleCredit] = useState('');

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const getConfs = async (userID) => {
    try {
      const response = await api.get(
        `/attendees/credits/users/${userID}?getAllCreditTypes=true`
      );
      dispatch(loadUserTotalCreditsAction(response.data.data.allCredits));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, 'danger'));
    }
  };

  useEffect(() => {
    getConfs(user?._id);
  }, [user?._id]);

  return (
    <>
      <div className="mb-80">
        <table className="uc-table">
          <thead>
            <tr>
              <th>Credit Type</th>
              <th>Total Credits</th>
              <th>Earned Credits</th>
              <th>Pending Clearance</th>
              <th>To Goal</th>
              <th>Goal Duration</th>
            </tr>
          </thead>
          <tbody>
            {totalCredits.length > 0 &&
              totalCredits?.map((credit) => {
                return (
                  <tr>
                    <td>{credit.creditName}</td>
                    <td>{credit.totalCreditQuantity}</td>
                    <td>{credit.earnedCreditQuantity}</td>
                    <td>{credit.pendingCreditQuantity}</td>
                    <td>
                      {credit?.goal ? (
                        <div className="flex-vchc">
                          <span className="mr-24">{credit.goal}</span>
                          <i
                            onClick={() => {
                              setSingleCredit(credit);
                              setEditMode(true);
                              setShowGoalModal(true);
                            }}
                          >
                            <EditIcon />
                          </i>
                        </div>
                      ) : (
                        <button
                          className="button button-green"
                          onClick={() => {
                            setSingleCredit(credit);
                            console.log('credit', credit);
                            setShowGoalModal(true);
                            setEditMode(false);
                          }}
                        >
                          Set goal
                        </button>
                      )}
                    </td>
                    <td>
                      {`${formatInTimeZone(
                        new Date(credit.creditGoalStartDate),
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        'MMM dd yyyy',
                        { locale: enGB }
                      )}  -  ${formatInTimeZone(
                        new Date(credit.creditGoalEndDate),
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        'MMM dd yyyy',
                        { locale: enGB }
                      )}`}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {showGoalModal && (
          <ModalX onDismiss={() => setShowGoalModal(false)}>
            <SetGoalModal
              setShowGoalModal={setShowGoalModal}
              data={singleCredit}
              editMode={editMode}
            />
          </ModalX>
        )}
      </div>
    </>
  );
};

export default CreditsTable;
