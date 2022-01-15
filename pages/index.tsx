import { gql, useQuery } from '@apollo/client';
import { CashIcon } from '@heroicons/react/solid';
import type { NextPage } from 'next';
import { useState } from 'react';
import { Else, If, Then } from 'react-if';
import Button from '../components/common/button';
import Card from '../components/common/card';
import Container from '../components/common/container';
import Skeleton from '../components/common/skeleton';
import LendMoneyModal from '../components/index/lend-money-modal';
import MyDebts from '../components/index/my-debts';
import MyUnpaidLendedDebts from '../components/index/my-unpaid-lended-debts';
import User from '../models/User';

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useQuery<{ user: User }>(GQL);

  return (
    <Container className="mx-auto my-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="lg:col-span-2">
        <h1 className="flex items-center text-2xl mb-4">
          <span className="mr-2">Hello</span>
          <If condition={loading}>
            <Then>
              <Skeleton type="box" className="max-w-xs" />
            </Then>
            <Else>
              <span className="font-bold">{data?.user.userName}</span>
            </Else>
          </If>
        </h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsOpen(true)}>
            <CashIcon className="h-5 w-5" />
            <span className="ml-2">Lend Money</span>
          </Button>
        </div>
      </Card>
      <MyDebts />
      <MyUnpaidLendedDebts />
      <LendMoneyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Container>
  );
};

const GQL = gql`
  query GetUser {
    user {
      id
      discordId
      userName
      password
    }
  }
`;

export default Home;
