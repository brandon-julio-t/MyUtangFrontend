import { gql, useQuery } from '@apollo/client';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debt from '../../models/Debt';
import { AppRootState } from '../../stores/app';
import { loadDebtHistory } from '../../stores/index-slice';
import Modal, { ModalProps } from '../common/modal';
import DebtsTable from './debts-table';

const DebtHistoryModal: FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const debtHistory = useSelector<AppRootState, Debt[]>(
    state => state.index.debtHistory
  );
  const dispatch = useDispatch();

  const { data, loading } = useQuery<{ debtHistory: Debt[] }>(GQL);

  useEffect(() => {
    dispatch(loadDebtHistory(data?.debtHistory ?? []));
  }, [data?.debtHistory, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='My Debt History'>
      <DebtsTable
        debts={debtHistory}
        loading={loading}
        isViewOnly
        isLending={false}
      />
    </Modal>
  );
};

const GQL = gql`
  query DebtHistory {
    debtHistory {
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

export default DebtHistoryModal;
