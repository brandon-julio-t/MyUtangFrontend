import User from '../../../models/User';
import Button from '../../common/button';
import Input from '../../common/input';
import { gql, useMutation } from '@apollo/client';
import React, { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

const EditPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePassword, { loading }] = useMutation<
    { changePassword: User },
    { oldPassword: string; newPassword: string }
  >(GQL);

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    const errors = [
      oldPassword ? null : 'Old password is required.',
      newPassword ? null : 'New password is required.',
      oldPassword === newPassword ? null : 'Passwords do not match.',
    ].filter(e => e);

    if (errors.length) {
      errors.forEach(err => toast.error(err));
      return;
    }

    await toast.promise(
      changePassword({ variables: { oldPassword, newPassword } }),
      {
        success: 'Change password success.',
        loading: 'Changing password...',
        error: 'Change password failed. Please try again.',
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className='grid grid-cols-1 gap-4'>
      <h2 className='font-medium'>Edit Password</h2>
      <Input
        type='password'
        placeholder='Old password'
        onChange={e => setOldPassword(e.target.value)}
        required
        disabled={loading}
      />
      <Input
        type='password'
        placeholder='New password'
        onChange={e => setNewPassword(e.target.value)}
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
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`;

export default EditPassword;
