import { gql, useQuery } from '@apollo/client';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debt from '../../models/Debt';
import { AppRootState } from '../../stores/app';
import { loadLendings } from '../../stores/index-slice';
import DebtsCard from './debts-card';

const MyLendings: FunctionComponent = () => {
  const lendings = useSelector<AppRootState, Debt[]>(state => state.index.lendings);
  const dispatch = useDispatch();

  const { data, loading } = useQuery<{ unpaidLendedDebts: Debt[] }>(GQL);

  useEffect(() => {
    dispatch(loadLendings(data?.unpaidLendedDebts ?? []));
  }, [data?.unpaidLendedDebts, dispatch]);

  return <DebtsCard debts={lendings} emptyMessage="No unpaid lended debts" loading={loading} title="My Lendings" />;
};

const GQL = gql`
  query GetUnpaidLendedDebts {
    unpaidLendedDebts {
      id
      title
      description
      amount
    }
  }
`;

export default MyLendings;
