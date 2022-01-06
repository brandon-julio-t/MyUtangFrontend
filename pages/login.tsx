import type { NextPage } from 'next';
import Button from '../components/button';
import Card from '../components/card';
import Container from '../components/container';
import Input from '../components/input';
import Modal from '../components/modal';

const Login: NextPage = () => {
  return (
    <Modal>
      <Container className="h-full mx-auto flex justify-center items-center">
        <Card className="max-w-sm w-full">
          <form className="grid grid-cols-1 gap-4">
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Button type="submit">Login</Button>
          </form>
        </Card>
      </Container>
    </Modal>
  );
};

export default Login;
