import { gql, useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import Debt from '../../models/Debt';
import Modal, { ModalProps } from '../common/modal';
import DebtsTable from './debts-table';

const DebtHistoryModal: FunctionComponent<ModalProps> = ({ isOpen, onClose }) => {
  const { data, loading } = useQuery<{ debtHistory: Debt[] }>(GQL);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'My Debt History'}>
      <DebtsTable debts={data?.debtHistory ?? []} loading={loading} isViewOnly isLending={false} />
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
