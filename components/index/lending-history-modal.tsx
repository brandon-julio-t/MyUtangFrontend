import { gql, useQuery } from '@apollo/client';
import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Debt from '../../models/Debt';
import { AppRootState } from '../../stores/app';
import { loadDebtHistory } from '../../stores/index-slice';
import Modal, { ModalProps } from '../common/modal';
import DebtsTable from './debts-table';

const LendingHistoryModal: FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const lendingHistory = useSelector<AppRootState, Debt[]>(
    state => state.index.lendingHistory
  );
  const dispatch = useDispatch();

  const { data, loading } = useQuery<{ lendingHistory: Debt[] }>(GQL);

  useEffect(() => {
    dispatch(loadDebtHistory(data?.lendingHistory ?? []));
  }, [data?.lendingHistory, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='My Lending History'>
      <DebtsTable
        debts={lendingHistory ?? []}
        loading={loading}
        isViewOnly
        isLending={true}
      />
    </Modal>
  );
};

const GQL = gql`
  query LendingHistory {
    lendingHistory {
      id
      title
      description
      debtor {
        userName
      }
      lender {
        userName
      }
      amount
    }
  }
`;

export default LendingHistoryModal;
