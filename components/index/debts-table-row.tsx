import Debt from '../../models/Debt';
import Button from '../common/button';
import Modal from '../common/modal';
import Table from '../common/table';
import LendMoneyModal from './lend-money-modal';
import MarkLendingAsPaidButton from './mark-lending-as-paid-button';
import PayDebtButton from './pay-debt-button';
import { FunctionComponent, useState } from 'react';
import { Else, If, Then } from 'react-if';

const DebtsTableRow: FunctionComponent<{
  idx: number;
  debt: Debt;
  isViewOnly?: boolean;
  isLending: boolean;
}> = ({ idx, debt, isViewOnly, isLending }) => {
  const [showDetailModal, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <>
      <Table.Row
        idx={idx}
        onClick={() => setShow(true)}
        className='cursor-pointer'>
        <Table.Cell className='whitespace-nowrap'>{debt.title}</Table.Cell>
        <Table.Cell>{Number(debt.amount).toLocaleString()}</Table.Cell>
        <Table.Cell>
          {(isLending ? debt.debtor?.userName : debt.lender?.userName) ?? '-'}
        </Table.Cell>
        <If condition={!isViewOnly}>
          <Then>
            <Table.Cell className='relative flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
              <If condition={isLending}>
                <Then>
                  <Button
                    onClick={() => setShowUpdateModal(true)}
                    iconName='PencilIcon'>
                    Edit
                  </Button>
                  <MarkLendingAsPaidButton debt={debt} />
                </Then>
                <Else>
                  <PayDebtButton debt={debt} />
                </Else>
              </If>
            </Table.Cell>
          </Then>
        </If>
      </Table.Row>

      <Modal
        isOpen={showDetailModal}
        title={debt.title}
        onClose={() => setShow(false)}>
        <p className='whitespace-pre-wrap break-words'>{debt.description}</p>
      </Modal>

      <LendMoneyModal
        isOpen={showUpdateModal}
        debt={debt}
        onClose={() => setShowUpdateModal(false)}
      />
    </>
  );
};

export default DebtsTableRow;
