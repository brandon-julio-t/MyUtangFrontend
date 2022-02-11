import Button from '../components/common/button';
import Card from '../components/common/card';
import Container from '../components/common/container';
import Input from '../components/common/input';
import AuthPayload from '../models/AuthPayload';
import { gql, useMutation } from '@apollo/client';
import { LoginIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

const Login: NextPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading }] = useMutation<
    { login: AuthPayload },
    { userName: string; password: string }
  >(GQL);

  const router = useRouter();

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    const { data } = await toast.promise(
      login({ variables: { userName, password } }),
      {
        loading: 'Login...',
        success: 'Login success.',
        error: 'Login failed. Please try again.',
      }
    );

    if (data?.login.token) {
      const { token } = data.login;
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
          <Button isLoading={loading} type='submit' iconName='LoginIcon'>
            Login
          </Button>
        </form>
      </Card>

      <Card className='w-full max-w-sm'>
        <p className='text-center'>
          No account?{' '}
          <span className='underline'>
            <Link href='/register'>Register here</Link>
          </span>
          .
        </p>
      </Card>
    </Container>
  );
};

const GQL = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      token
    }
  }
`;

export default Login;
