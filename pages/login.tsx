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

const Login: NextPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading }] = useMutation<{ login: AuthPayload }, { userName: string; password: string }>(GQL);

  const router = useRouter();

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    const { data } = await toast.promise(login({ variables: { userName, password } }), {
      loading: 'Login...',
      success: 'Login success.',
      error: 'Login failed. Please try again.',
    });

    if (data?.login.token) {
      const { token } = data.login;
      document.cookie = `token=${token}`;
      localStorage.setItem('token', token);
      router.push('/');
    }
  };

  return (
    <Container className="h-screen mx-auto flex flex-col space-y-3 justify-center items-center">
      <Card className="max-w-sm w-full">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
          <Input onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" required />
          <Input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
          <Button isLoading={loading} type="submit">
            Login
          </Button>
        </form>
      </Card>

      <Card className="max-w-sm w-full">
        <p className="text-center">
          No account?{' '}
          <span className="underline">
            <Link href="/register">Register here</Link>
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
