import { gql, useMutation } from '@apollo/client';
import type { NextPage } from 'next';
import { getCookieParser } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { browser } from 'process';
import { FormEventHandler, useEffect, useState } from 'react';
import Button from '../components/button';
import Card from '../components/card';
import Container from '../components/container';
import Input from '../components/input';
import Modal from '../components/modal';

const Login: NextPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading }] = useMutation<
    {
      login: { token: string };
    },
    { userName: string; password: string }
  >(GQL);
  const router = useRouter();

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();
    login({ variables: { userName, password } });
  };
  useEffect(() => {
    if (data?.login.token) {
      localStorage.setItem('token', data.login.token);
      router.push('/');
    }
  }, [data, router]);

  return (
    <Modal>
      <Container className="h-full mx-auto flex justify-center items-center">
        <Card className="max-w-sm w-full">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            <Input onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
            <Input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <Button isLoading={loading} type="submit">
              Login
            </Button>
          </form>
        </Card>
      </Container>
    </Modal>
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
