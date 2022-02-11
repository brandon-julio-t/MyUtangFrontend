import Debt from '../../models/Debt';
import { AppDispatch } from '../../stores/app';
import { addLending, updateLending } from '../../stores/index-slice';
import Button from '../common/button';
import Input from '../common/input';
import Modal, { ModalProps } from '../common/modal';
import UsersSelectInput from './users-select-input';
import { gql, useMutation } from '@apollo/client';
import { FormEventHandler, FunctionComponent, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const LendMoneyModal: FunctionComponent<ModalProps & { debt?: Debt }> = ({
  isOpen,
  onClose,
  debt,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [createDebt, { loading: createDebtLoading }] = useMutation<
    { createDebt: Debt },
    { title: string; description: string; debtorId: string; amount: number }
  >(CREATE_GQL);

  const [updateDebt, { loading: updateDebtLoading }] = useMutation<
    { updateDebt: Debt },
    { debtId: string; title: string; description: string; amount: number }
  >(UPDATE_GQL);

  const [debtorId, setdebtorId] = useState(debt?.debtor?.id ?? '');
  const [title, setTitle] = useState(debt?.title ?? '');
  const [description, setDescription] = useState(debt?.description ?? '');
  const [amount, setAmount] = useState(debt?.amount ?? 1000);

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    const errors = [
      debtorId ? null : 'Please select a debtor.',
      title ? null : 'Title must be filled.',
      description ? null : 'Description must be filled.',
      amount >= 1000
        ? null
        : `Amount must be at least ${Number(1000).toLocaleString()}.`,
    ].filter(e => e);

    if (errors.length) {
      errors.forEach(err => toast.error(err));
      return;
    }

    if (debt) {
      const { data } = await toast.promise(
        updateDebt({
          variables: { debtId: debt.id, amount, description, title },
        }),
        {
          loading: 'Updating debt...',
          success: 'Update debt success.',
          error: 'Update debt failed. Please try again.',
        }
      );

      if (data?.updateDebt) {
        dispatch(updateLending(data.updateDebt));
      }
    } else {
      const { data } = await toast.promise(
        createDebt({ variables: { amount, debtorId, description, title } }),
        {
          loading: 'Creating debt...',
          success: 'Create debt success.',
          error: 'Create debt failed. Please try again.',
        }
      );

      if (data?.createDebt) {
        dispatch(addLending(data.createDebt));
      }
    }
  };

  return (
    <Modal title='Lend Money' isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit} className='grid grid-cols-1 gap-4'>
        <UsersSelectInput
          onUserChange={userId => setdebtorId(userId)}
          userId={debtorId}
          disabled={!!debt}
        />
        <Input
          type='text'
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder='Title'
          required
        />
        <Input
          type='textarea'
          onChange={e => setDescription(e.target.value)}
          value={description}
          placeholder='Description'
          required
        />
        <Input
          type='number'
          onChange={e => setAmount(Number(e.target.value))}
          value={amount}
          placeholder='Amount'
          min={1000}
          required
        />
        <div className='grid grid-cols-2 gap-4'>
          <Button isLoading={createDebtLoading || updateDebtLoading}>
            Submit
          </Button>
          <Button type='button' onClick={onClose} styleType='danger'>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const CREATE_GQL = gql`
  mutation CreateDebt(
    $title: String!
    $description: String!
    $debtorId: ID!
    $amount: Int!
  ) {
    createDebt(
      title: $title
      description: $description
      debtorId: $debtorId
      amount: $amount
    ) {
      id
      title
      description
      amount
      debtor {
        id
        userName
      }
    }
  }
`;

const UPDATE_GQL = gql`
  mutation UpdateDebt(
    $debtId: ID!
    $title: String!
    $description: String!
    $amount: Int!
  ) {
    updateDebt(
      debtId: $debtId
      title: $title
      description: $description
      amount: $amount
    ) {
      id
      title
      description
      amount
      debtor {
        id
        userName
      }
    }
  }
`;

export default LendMoneyModal;
