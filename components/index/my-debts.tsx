import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import Debt from '../../models/Debt';
import Card from '../common/card';
import DebtsTable from './debts-table';

const MyDebts: FunctionComponent = () => {
  const { data, loading } = useQuery<{ unpaidDebts: Debt[] }>(GQL);

  return (
    <Card>
      <h2 className="mb-4 text-xl font-bold">My Debts</h2>

      <DebtsTable debts={data?.unpaidDebts ?? []} loading={loading} emptyMessage="No unpaid debts." />
    </Card>
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
