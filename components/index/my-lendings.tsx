import { gql, useQuery } from '@apollo/client';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debt from '../../models/Debt';
import { IndexRootState, loadLendings } from '../../stores';
import DebtsCard from './debts-card';

const MyLendings: FunctionComponent = () => {
  const lendings = useSelector<IndexRootState, Debt[]>(state => state.lendings);
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
