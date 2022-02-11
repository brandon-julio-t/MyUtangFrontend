import { FunctionComponent } from 'react';
import { Else, If, Then } from 'react-if';
import Debt from '../../models/Debt';
import Skeleton from '../common/skeleton';
import Table from '../common/table';
import DebtsTableRow from './debts-table-row';

const DebtsTable: FunctionComponent<{
  debts: Debt[];
  loading: boolean;
  isViewOnly?: boolean;
  isLending: boolean;
}> = ({ debts, loading, isViewOnly, isLending }) => {
  return (
    <Table>
      <Table.HeadSection>
        <tr>
          <Table.Head>Title</Table.Head>
          <Table.Head>Amount</Table.Head>
          <Table.Head>{isLending ? 'Debtor' : 'Lender'}</Table.Head>
          <If condition={!isViewOnly}>
            <Then>
              <Table.Head></Table.Head>
            </Then>
          </If>
        </tr>
      </Table.HeadSection>
      <Table.BodySection>
        <If condition={debts.length}>
          <Then>
            {debts.map((debt, idx) => (
              <DebtsTableRow
                key={debt.id}
                idx={idx}
                debt={debt}
                isViewOnly={isViewOnly}
                isLending={isLending}
              />
            ))}
          </Then>
          <Else>
            <If condition={loading}>
              <Then>
                <Table.Row idx={0}>
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Table.Cell key={idx}>
                      <Skeleton />
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Then>
              <Else>
                <Table.Row idx={0}>
                  <Table.Cell colSpan={4} className='text-center'>
                    {isLending ? 'No unpaid lendings.' : 'No unpaid debts.'}
                  </Table.Cell>
                </Table.Row>
              </Else>
            </If>
          </Else>
        </If>
      </Table.BodySection>
    </Table>
  );
};

export default DebtsTable;
