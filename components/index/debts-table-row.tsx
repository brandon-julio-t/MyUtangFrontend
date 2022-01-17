import { CashIcon } from '@heroicons/react/solid';
import { gql, useMutation } from '@apollo/client';
import { EventHandler, FunctionComponent, MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Debt from '../../models/Debt';
import { removeDebt } from '../../stores/index-slice';
import Button from '../common/button';
import Table from '../common/table';
import Modal from '../common/modal';

const DebtsTableRow: FunctionComponent<{ idx: number; debt: Debt }> = ({ idx, debt }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const [payDebt, { loading }] = useMutation<{ payDebt: Debt }, { debtId: string }>(GQL);

  const onPay = async () => {
    const { data } = await toast.promise(payDebt({ variables: { debtId: debt.id } }), {
      loading: 'Paying debts...',
      success: 'Pay debt success.',
      error: 'Pay debt failed. Please try again.',
    });

    if (data?.payDebt) {
      dispatch(removeDebt(data.payDebt));
    }
  };

  return (
    <>
      <Table.Row
        key={idx}
        idx={idx}
        onClick={() => setShow(true)}
        className="cursor-pointer"
      >
        <Table.Cell className="text-center">{idx + 1}</Table.Cell>
        <Table.Cell className="whitespace-nowrap">{debt.title}</Table.Cell>
        <Table.Cell>{Number(debt.amount).toLocaleString()}</Table.Cell>
        <Table.Cell>
          <Button onClick={onPay} isLoading={loading}>
            <CashIcon className="h-5 w-5" /> <span className="ml-2">Pay</span>
          </Button>
        </Table.Cell>
      </Table.Row>

      <Modal isOpen={show} title={debt.title} onClose={() => setShow(false)}>
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
