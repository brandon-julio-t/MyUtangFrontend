import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import Debt from '../../models/Debt';
import DebtsCard from './debts-card';

const MyUnpaidLendedDebts: FunctionComponent = () => {
  const { data, loading } = useQuery<{ unpaidLendedDebts: Debt[] }>(GQL);

  return (
    <DebtsCard
      debts={data?.unpaidLendedDebts ?? []}
      emptyMessage="No unpaid lended debts"
      loading={loading}
      title="My Lendings"
    />
  );
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

export default MyUnpaidLendedDebts;
