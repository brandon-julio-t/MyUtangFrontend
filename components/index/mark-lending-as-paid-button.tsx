import Debt from '../../models/Debt';
import { addLendingHistory, removeLending } from '../../stores/index-slice';
import Button from '../common/button';
import Card from '../common/card';
import { gql, useMutation } from '@apollo/client';
import { Transition } from '@headlessui/react';
import React, { FunctionComponent, HTMLAttributes, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const MarkLendingAsPaidButton: FunctionComponent<
  HTMLAttributes<HTMLButtonElement> & { debt: Debt }
> = ({ debt, ...rest }) => {
  const dispatch = useDispatch();

  const [markLendingAsPaid, { loading }] = useMutation<
    { markLendingAsPaid: Debt },
    { debtId: string }
  >(GQL);

  const [show, setShow] = useState(false);

  const onClick = async () => {
    setShow(false);

    const { data } = await toast.promise(
      markLendingAsPaid({ variables: { debtId: debt.id } }),
      {
        loading: 'Marking lending as paid...',
        success: 'Lending marked as paid success.',
        error: 'Lending marked as paid failed. Please try again.',
      }
    );

    if (data?.markLendingAsPaid) {
      dispatch(removeLending(data.markLendingAsPaid));
      dispatch(addLendingHistory(data.markLendingAsPaid));
    }
  };

  return (
    <>
      <Button
        {...rest}
        onClick={() => setShow(true)}
        isLoading={loading}
        iconName='CashIcon'>
        Mark as Paid
      </Button>

      <Transition
        className='absolute bottom-0 right-0 z-10 md:right-20'
        show={show}
        enter='transition'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'>
        <Card>
          <p className='mb-2 whitespace-nowrap'>Are you sure they have paid?</p>
          <div className='flex w-full justify-end space-x-2'>
            <Button isLoading={loading} onClick={onClick}>
              Yes
            </Button>
            <Button
              isLoading={loading}
              styleType='danger'
              onClick={() => setShow(false)}>
              No
            </Button>
          </div>
        </Card>
      </Transition>
    </>
  );
};

const GQL = gql`
  mutation MarkLendingAsPaid($debtId: ID!) {
    markLendingAsPaid(debtId: $debtId) {
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

export default MarkLendingAsPaidButton;
