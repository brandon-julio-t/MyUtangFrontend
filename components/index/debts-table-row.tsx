import { gql, useMutation } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { CashIcon } from '@heroicons/react/solid';
import { FunctionComponent, useState } from 'react';
import toast from 'react-hot-toast';
import { If, Then } from 'react-if';
import { useDispatch } from 'react-redux';
import Debt from '../../models/Debt';
import { removeDebt } from '../../stores/index-slice';
import Button from '../common/button';
import Card from '../common/card';
import Modal from '../common/modal';
import Table from '../common/table';

const DebtsTableRow: FunctionComponent<{ idx: number; debt: Debt; isLending: boolean }> = ({
  idx,
  debt,
  isLending,
}) => {
  const dispatch = useDispatch();

  const [showDetailModal, setShow] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const [payDebt, { loading }] = useMutation<{ payDebt: Debt }, { debtId: string }>(GQL);

  const onPay = async () => {
    setShowConfirmationDialog(false);

    const { data } = await toast.promise(payDebt({ variables: { debtId: debt.id } }), {
      loading: 'Paying debt...',
      success: 'Debt payment success.',
      error: 'Debt payment failed. Please try again.',
    });

    if (data?.payDebt) {
      dispatch(removeDebt(data.payDebt));
    }
  };

  return (
    <>
      <Table.Row idx={idx} onClick={() => setShow(true)} className="cursor-pointer">
        <Table.Cell className="whitespace-nowrap">{debt.title}</Table.Cell>
        <Table.Cell>{Number(debt.amount).toLocaleString()}</Table.Cell>
        <Table.Cell>{(isLending ? debt.debtor?.userName : debt.lender?.userName) ?? '-'}</Table.Cell>
        <If condition={!isLending}>
          <Then>
            <Table.Cell className="relative">
              <Button onClick={() => setShowConfirmationDialog(true)} isLoading={loading}>
                <CashIcon className="h-5 w-5" /> <span className="ml-2">Pay</span>
              </Button>

              <Transition
                show={showConfirmationDialog}
                enter="transition"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Card className="absolute -bottom-8 right-0 md:right-8 origin-center z-10">
                  <p className="mb-2 whitespace-nowrap">Are you sure you have paid your debt?</p>
                  <div className="w-full flex justify-end space-x-2">
                    <Button isLoading={loading} onClick={onPay}>
                      Yes
                    </Button>
                    <Button isLoading={loading} styleType="danger" onClick={() => setShowConfirmationDialog(false)}>
                      No
                    </Button>
                  </div>
                </Card>
              </Transition>
            </Table.Cell>
          </Then>
        </If>
      </Table.Row>

      <Modal isOpen={showDetailModal} title={debt.title} onClose={() => setShow(false)}>
        <p className="whitespace-pre-wrap break-words">{debt.description}</p>
      </Modal>
    </>
  );
};

const GQL = gql`
  mutation PayDebt($debtId: ID!) {
    payDebt(debtId: $debtId) {
      isPaid
      amount
      description
      title
      id
    }
  }
`;

export default DebtsTableRow;
