import { gql, useMutation, useQuery } from '@apollo/client';
import { FormEventHandler, FunctionComponent, useState } from 'react';
import toast from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import Debt from '../../models/Debt';
import User from '../../models/User';
import Button from '../common/button';
import Input from '../common/input';
import Modal, { ModalProps } from '../common/modal';

const LendMoneyModal: FunctionComponent<ModalProps> = ({ isOpen, onClose }) => {
  const [debtorId, setdebtorId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const { data, loading } = useQuery<{ users: User[] }>(USERS_GQL);
  const [createDebt, {}] = useMutation<
    { createDebt: Debt },
    { title: string; description: string; debtorId: string; amount: number }
  >(CREATE_DEBT_GQL);

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    const {} = await toast.promise(createDebt({ variables: { amount, debtorId, description, title } }), {
      loading: 'Creating debt...',
      success: 'Create debt success.',
      error: 'An error occurred while creating debt. Please try again.',
    });

    onClose();
  };

  return (
    <Modal title="Lend Money" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
        <Input type="select" onChange={e => setdebtorId(e.target.value)}>
          <If condition={loading}>
            <Then>
              <option>Loading...</option>
            </Then>
            <Else>
              {data?.users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.userName}
                </option>
              ))}
            </Else>
          </If>
        </Input>
        <Input type="text" onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <Input type="textarea" onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        <Input type="number" onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" min={1} required />
        <div className="grid grid-cols-2 gap-4">
          <Button>Submit</Button>
          <Button type="button" onClick={onClose} styleType='danger'>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const USERS_GQL = gql`
  query GetAllUsers {
    users {
      id
      userName
    }
  }
`;

const CREATE_DEBT_GQL = gql`
  mutation CreateDebt($title: String!, $description: String!, $debtorId: ID!, $amount: Int!) {
    createDebt(title: $title, description: $description, debtorId: $debtorId, amount: $amount) {
      id
      title
      description
      amount
    }
  }
`;

export default LendMoneyModal;
