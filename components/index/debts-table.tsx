import { FunctionComponent } from 'react';
import { Else, If, Then } from 'react-if';
import Debt from '../../models/Debt';
import Skeleton from '../common/skeleton';
import Table from '../common/table';
import DebtsTableRow from './debts-table-row';

const DebtsTable: FunctionComponent<{
  debts: Debt[];
  loading: boolean;
  isLending: boolean;
}> = ({ debts, loading, isLending }) => {
  return (
    <Table>
      <Table.HeadSection>
        <tr>
          <Table.Head>Title</Table.Head>
          <Table.Head>Amount</Table.Head>
          <Table.Head>{isLending ? 'Debtor' : 'Lender'}</Table.Head>
          <Table.Head></Table.Head>
        </tr>
      </Table.HeadSection>
      <Table.BodySection>
        <If condition={debts.length}>
          <Then>
            {debts.map((debt, idx) => (
              <DebtsTableRow key={debt.id} idx={idx} debt={debt} isLending={isLending} />
            ))}
          </Then>
          <Else>
            <If condition={loading}>
              <Then>
                <tr className="transition bg-white dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-500">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Table.Cell key={idx}>
                      <Skeleton />
                    </Table.Cell>
                  ))}
                </tr>
              </Then>
              <Else>
                <tr className="transition bg-white dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-500">
                  <Table.Cell colSpan={4} className="text-center">
                    {isLending ? 'No unpaid lendings.' : 'No unpaid debts.'}
                  </Table.Cell>
                </tr>
              </Else>
            </If>
          </Else>
        </If>
      </Table.BodySection>
    </Table>
  );
};

export default DebtsTable;
