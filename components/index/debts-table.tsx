import { FunctionComponent } from 'react';
import { Else, If, Then } from 'react-if';
import Debt from '../../models/Debt';
import Skeleton from '../common/skeleton';
import Table from '../common/table';
import DebtsTableRow from './debts-table-row';

const DebtsTable: FunctionComponent<{ debts: Debt[]; loading: boolean; emptyMessage: string }> = props => {
  return (
    <Table>
      <Table.HeadSection>
        <tr>
          <Table.Head>No.</Table.Head>
          <Table.Head>Title</Table.Head>
          <Table.Head>Amount</Table.Head>
          <Table.Head></Table.Head>
        </tr>
      </Table.HeadSection>
      <Table.BodySection>
        <If condition={props.debts.length}>
          <Then>
            {props.debts.map((debt, idx) => (
              <DebtsTableRow key={debt.id} idx={idx} debt={debt} />
            ))}
          </Then>
          <Else>
            <If condition={props.loading}>
              <Then>
                <tr className="transition bg-white dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-500">
                  <Table.Cell>
                    <Skeleton type="box" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton type="box" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton type="box" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton type="box" />
                  </Table.Cell>
                </tr>
              </Then>
              <Else>
                <tr className="transition bg-white dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-500">
                  <Table.Cell colSpan={4} className="text-center">
                    {props.emptyMessage}
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
