import { gql, useMutation } from '@apollo/client';
import { FormEventHandler, FunctionComponent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Debt from '../../models/Debt';
import { AppDispatch } from '../../stores/app';
import { addLending } from '../../stores/index-slice';
import Button from '../common/button';
import Input from '../common/input';
import Modal, { ModalProps } from '../common/modal';
import UsersSelectInput from './users-select-input';

const LendMoneyModal: FunctionComponent<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [createDebt, {}] = useMutation<
    { createDebt: Debt },
    { title: string; description: string; debtorId: string; amount: number }
  >(GQL);

  const [debtorId, setdebtorId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    const { data } = await toast.promise(createDebt({ variables: { amount, debtorId, description, title } }), {
      loading: 'Creating debt...',
      success: 'Create debt success.',
      error: 'Create debt failed. Please try again.',
    });

    if (data?.createDebt) {
      dispatch(addLending(data.createDebt));
    }
  };

  return (
    <Modal title="Lend Money" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
        <UsersSelectInput onUserChange={userId => setdebtorId(userId)} />
        <Input type="text" onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <Input type="textarea" onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        <Input type="number" onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" min={1} required />
        <div className="grid grid-cols-2 gap-4">
          <Button>Submit</Button>
          <Button type="button" onClick={onClose} styleType="danger">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const GQL = gql`
  mutation CreateDebt($title: String!, $description: String!, $debtorId: ID!, $amount: Int!) {
    createDebt(title: $title, description: $description, debtorId: $debtorId, amount: $amount) {
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
