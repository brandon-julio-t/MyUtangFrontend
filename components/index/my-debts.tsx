import { gql, useQuery } from '@apollo/client';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debt from '../../models/Debt';
import { IndexRootState, loadDebts } from '../../stores';
import DebtsCard from './debts-card';

const MyDebts: FunctionComponent = () => {
  const debts = useSelector<IndexRootState, Debt[]>(state => state.debts);
  const dispatch = useDispatch();

  const { data, loading } = useQuery<{ unpaidDebts: Debt[] }>(GQL);

  useEffect(() => {
    dispatch(loadDebts(data?.unpaidDebts ?? []));
  },[data?.unpaidDebts, dispatch]);

  return (
    <DebtsCard debts={debts} emptyMessage="No unpaid debts." loading={loading} title="My Debts" />
  );
};

const GQL = gql`
  query GetUnpaidDebts {
    unpaidDebts {
      id
      title
      description
      amount
    }
  }
`;

export default MyDebts;
