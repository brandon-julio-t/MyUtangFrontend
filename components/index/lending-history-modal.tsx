import { gql, useQuery } from '@apollo/client';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debt from '../../models/Debt';
import { AppRootState } from '../../stores/app';
import { loadLendingHistory } from '../../stores/index-slice';
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
    dispatch(loadLendingHistory(data?.lendingHistory ?? []));
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
