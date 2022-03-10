import User from '../../../models/User';
import Button from '../../common/button';
import Input from '../../common/input';
import { gql, useMutation } from '@apollo/client';
import React, {
  ComponentProps,
  ComponentType,
  FormEventHandler,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const EditUsername: ComponentType<ComponentProps<'form'>> = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [changeUsername, { loading }] = useMutation<
    { changeUserName: User },
    { userName: string }
  >(GQL);

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    const errors = [userName ? null : 'New username is required.'].filter(
      e => e
    );

    if (errors.length) {
      errors.forEach(err => toast.error(err));
      return;
    }

    const { data } = await toast.promise(
      changeUsername({ variables: { userName } }),
      {
        success: 'Change username success.',
        loading: 'Changing username...',
        error: 'Change username failed. Please try again.',
      }
    );

    if (data?.changeUserName) {
      dispatch(setUserName(data.changeUserName.userName));
    }
  };

  return (
    <form onSubmit={onSubmit} className='grid grid-cols-1 gap-4'>
      <h2 className='font-medium'>Edit Username</h2>
      <Input
        type='text'
        placeholder='New username'
        onChange={e => setUserName(e.target.value)}
        required
        disabled={loading}
      />
      <Button type='submit' isLoading={loading}>
        Submit
      </Button>
    </form>
  );
};

const GQL = gql`
  mutation ChangeUserName($userName: String!) {
    changeUserName(userName: $userName) {
      userName
    }
  }
`;

export default EditUsername;
