import { FunctionComponent } from 'react';
import { Else, If, Then } from 'react-if';
import Debt from '../../models/Debt';
import Skeleton from '../common/skeleton';
import Table from '../common/table';

const DebtsTable: FunctionComponent<{ debts: Debt[]; loading: boolean; emptyMessage: string }> = props => {
  return (
    <Table>
      <Table.HeadSection>
        <tr>
          <Table.Head className="p-4">No.</Table.Head>
          <Table.Head className="p-4">Title</Table.Head>
          <Table.Head className="p-4">Description</Table.Head>
          <Table.Head className="p-4">Amount</Table.Head>
        </tr>
      </Table.HeadSection>
      <Table.BodySection>
        <If condition={props.debts.length}>
          <Then>
            {props.debts.map((debt, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 ? 'bg-white dark:bg-zinc-700' : 'bg-slate-50 dark:bg-zinc-600'
                } transition bg-white dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-500`}
              >
                <Table.Cell className="p-4">{idx}</Table.Cell>
                <Table.Cell className="p-4">{debt.title}</Table.Cell>
                <Table.Cell className="p-4">{debt.description}</Table.Cell>
                <Table.Cell className="p-4">{debt.amount}</Table.Cell>
              </tr>
            ))}
          </Then>
          <Else>
            <If condition={props.loading}>
              <Then>
                <tr className="transition bg-white dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-500">
                  <Table.Cell className="text-center py-4">
                    <Skeleton type="box" />
                  </Table.Cell>
                  <Table.Cell className="text-center py-4">
                    <Skeleton type="box" />
                  </Table.Cell>
                  <Table.Cell className="text-center py-4">
                    <Skeleton type="box" />
                  </Table.Cell>
                  <Table.Cell className="text-center py-4">
                    <Skeleton type="box" />
                  </Table.Cell>
                </tr>
              </Then>
              <Else>
                <tr className="transition bg-white dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-500">
                  <Table.Cell colSpan={4} className="text-center py-4">
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
