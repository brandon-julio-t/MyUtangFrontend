import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import Debt from '../../models/Debt';
import Card from '../common/card';
import DebtsTable from './debts-table';

const MyUnpaidLendedDebts: FunctionComponent = () => {
  const { data, loading } = useQuery<{ unpaidLendedDebts: Debt[] }>(GQL);

  return (
    <Card>
      <h2 className="mb-4 text-xl font-bold">My Lended Debts</h2>

      <DebtsTable debts={data?.unpaidLendedDebts ?? []} loading={loading} emptyMessage="No unpaid lended debts." />
    </Card>
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
