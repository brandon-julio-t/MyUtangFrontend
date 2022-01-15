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
import Modal from '../components/common/modal';
import AuthPayload from '../models/AuthPayload';

const Register: NextPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register, { loading }] = useMutation<{ register: AuthPayload }, { userName: string; password: string }>(GQL);

  const router = useRouter();

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password does not match.');
      return;
    }

    const { data } = await toast.promise(register({ variables: { userName, password } }), {
      loading: 'Registering...',
      success: 'Register success.',
      error: 'An error occurred while register. Please try again.',
    });

    if (data?.register.token) {
      const { token } = data.register;
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
          <Input
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
            required
          />
          <Button isLoading={loading} type="submit">
            Register
          </Button>
        </form>
      </Card>

      <Card className="max-w-sm w-full">
        <p className="text-center">
          Already has an account?{' '}
          <span className="underline">
            <Link href="/login">Login</Link>
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
