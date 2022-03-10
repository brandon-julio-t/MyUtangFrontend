import Button from '../components/common/button';
import Card from '../components/common/card';
import Container from '../components/common/container';
import Skeleton from '../components/common/skeleton';
import DebtHistoryModal from '../components/index/debt-history-modal';
import EditProfileModal from '../components/index/edit-profile/modal';
import LendMoneyModal from '../components/index/lend-money-modal';
import LendingHistoryModal from '../components/index/lending-history-modal';
import MyDebts from '../components/index/my-debts';
import MyLendings from '../components/index/my-lendings';
import User from '../models/User';
import { AppRootState, setUser } from '../stores/app';
import { gql, useQuery } from '@apollo/client';
import {
  ClipboardListIcon,
  CreditCardIcon,
  LogoutIcon,
  PencilIcon,
} from '@heroicons/react/solid';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { useDispatch, useSelector } from 'react-redux';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [showLendMoneyModal, setShowLendMoneyModal] = useState(false);
  const [showDebtHistoryModal, setShowDebtHistoryModal] = useState(false);
  const [showLendingHistoryModal, setShowLendingHistoryModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { data, loading } = useQuery<{ user: User }>(GQL);
  const router = useRouter();
  const user = useSelector<AppRootState, User | null>(state => state.app.user);

  useEffect(() => {
    if (!loading && !data?.user) router.push('/login');
    dispatch(setUser(data?.user ?? null));
  }, [data?.user, dispatch, loading, router]);

  const onLogout = () => {
    document.cookie = 'token=';
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <Container className='mx-auto my-8 grid grid-cols-1 gap-4'>
      <Card>
        <header className='mb-4 flex flex-col md:flex-row items-center justify-between'>
          <h1 className='flex items-center text-2xl'>
            <span className='mr-2'>Hello</span>
            <If condition={loading || !user?.userName}>
              <Then>
                <Skeleton className='max-w-xs' />
              </Then>
              <Else>
                <span className='font-bold mr-4'>{user?.userName}</span>
                <Button
                  className='text-base'
                  onClick={() => setShowEditProfileModal(true)}
                >
                  <PencilIcon className='mr-2 h-5 w-5' />
                  Edit Profile
                </Button>
              </Else>
            </If>
          </h1>
          <Button
            styleType='danger'
            onClick={onLogout}
            className='w-full mt-4 md:mt-0 md:w-fit'
          >
            <LogoutIcon className='mr-2 h-5 w-5' />
            Logout
          </Button>
        </header>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <Button onClick={() => setShowLendMoneyModal(true)}>
            <CreditCardIcon className='mr-2 h-5 w-5' />
            Lend Money
          </Button>
          <Button onClick={() => setShowDebtHistoryModal(true)}>
            <ClipboardListIcon className='mr-2 h-5 w-5' />
            Debt History
          </Button>
          <Button onClick={() => setShowLendingHistoryModal(true)}>
            <ClipboardListIcon className='mr-2 h-5 w-5' />
            Lending History
          </Button>
        </div>
      </Card>

      <MyDebts />
      <MyLendings />

      <LendMoneyModal
        isOpen={showLendMoneyModal}
        onClose={() => setShowLendMoneyModal(false)}
      />
      <DebtHistoryModal
        isOpen={showDebtHistoryModal}
        onClose={() => setShowDebtHistoryModal(false)}
      />
      <LendingHistoryModal
        isOpen={showLendingHistoryModal}
        onClose={() => setShowLendingHistoryModal(false)}
      />
      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
      />
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
