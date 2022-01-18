import { gql, useQuery } from '@apollo/client';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debt from '../../models/Debt';
import User from '../../models/User';
import { AppRootState } from '../../stores/app';
import { loadDebts } from '../../stores/index-slice';
import DebtsCard from './debts-card';

const MyDebts: FunctionComponent = () => {
  const debts = useSelector<AppRootState, Debt[]>(state => state.index.debts);
  const dispatch = useDispatch();

  const { data, loading } = useQuery<{ unpaidDebts: Debt[] }>(GQL);

  useEffect(() => {
    dispatch(loadDebts(data?.unpaidDebts ?? []));
  }, [data?.unpaidDebts, dispatch]);

  return (
    <DebtsCard
      debts={[
        ...debts,
        new Debt('', 'test', 'test', null, new User('', null, 'iu', ''), 69, false),
        new Debt('', 'test', 'test', null, new User('', null, 'iu', ''), 69, false),
        new Debt('', 'test', 'test', null, new User('', null, 'iu', ''), 69, false),
        new Debt('', 'test', 'test', null, new User('', null, 'iu', ''), 69, false),
        new Debt('', 'test', 'test', null, new User('', null, 'iu', ''), 69, false),
        new Debt('', 'test', 'test', null, new User('', null, 'iu', ''), 69, false),
        new Debt('', 'test', 'test', null, new User('', null, 'iu', ''), 69, false),
        new Debt('', 'test', 'test', null, new User('', null, 'iu', ''), 69, false),
      ]}
      loading={loading}
      isLending={false}
    />
  );
};

const GQL = gql`
  query GetUnpaidDebts {
    unpaidDebts {
      id
      title
      description
      amount
      lender {
        userName
      }
    }
  }
`;

export default MyDebts;
