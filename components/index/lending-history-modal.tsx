import { gql, useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import Debt from '../../models/Debt';
import Modal, { ModalProps } from '../common/modal';
import DebtsTable from './debts-table';

const LendingHistoryModal: FunctionComponent<ModalProps> = ({isOpen,onClose}) => {
  const { data, loading } = useQuery<{ lendingHistory: Debt[] }>(GQL);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'My Lending History'}>
      <DebtsTable debts={data?.lendingHistory ?? []} loading={loading} isViewOnly isLending={true} />
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
