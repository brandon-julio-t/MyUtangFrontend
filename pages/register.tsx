import { PaperAirplaneIcon } from '@heroicons/react/solid';
import { gql, useMutation } from '@apollo/client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/common/button';
import Card from '../components/common/card';
import Container from '../components/common/container';
import Input from '../components/common/input';
import AuthPayload from '../models/AuthPayload';

const Register: NextPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register, { loading }] = useMutation<
    { register: AuthPayload },
    { userName: string; password: string }
  >(GQL);

  const router = useRouter();

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password does not match.');
      return;
    }

    const { data } = await toast.promise(
      register({ variables: { userName, password } }),
      {
        loading: 'Registering...',
        success: 'Register success.',
        error: 'Register failed. Please try again.',
      }
    );

    if (data?.register.token) {
      const { token } = data.register;
      document.cookie = `token=${token}`;
      localStorage.setItem('token', token);
      router.push('/');
    }
  };

  return (
    <Container className='mx-auto flex h-screen flex-col items-center justify-center space-y-3'>
      <Card className='w-full max-w-sm'>
        <form onSubmit={onSubmit} className='grid grid-cols-1 gap-4'>
          <Input
            onChange={e => setUsername(e.target.value)}
            type='text'
            placeholder='Username'
            required
          />
          <Input
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            required
          />
          <Input
            onChange={e => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='Confirm password'
            required
          />
          <Button isLoading={loading} type='submit'>
            <PaperAirplaneIcon className='mr-2 h-5 w-5' />
            Register
          </Button>
        </form>
      </Card>

      <Card className='w-full max-w-sm'>
        <p className='text-center'>
          Already has an account?{' '}
          <span className='underline'>
            <Link href='/login'>Login</Link>
          </span>
          .
        </p>
      </Card>
    </Container>
  );
};

const GQL = gql`
  mutation Register($userName: String!, $password: String!) {
    register(userName: $userName, password: $password) {
      token
    }
  }
`;

export default Register;
