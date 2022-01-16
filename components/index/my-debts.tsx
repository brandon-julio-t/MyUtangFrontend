import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import Debt from '../../models/Debt';
import DebtsCard from './debts-card';

const MyDebts: FunctionComponent = () => {
  const { data, loading } = useQuery<{ unpaidDebts: Debt[] }>(GQL);

  return (
    <DebtsCard debts={data?.unpaidDebts ?? []} emptyMessage="No unpaid debts." loading={loading} title="My Debts" />
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
