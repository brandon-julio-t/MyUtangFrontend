import { FunctionComponent, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

const Table: FunctionComponent<HTMLAttributes<HTMLTableElement>> & {
  HeadSection: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>>;
  BodySection: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>>;
  Row: FunctionComponent<ThHTMLAttributes<HTMLTableRowElement> & { idx: number }>;
  Head: FunctionComponent<ThHTMLAttributes<HTMLTableCellElement>>;
  Cell: FunctionComponent<TdHTMLAttributes<HTMLTableCellElement>>;
} = props => {
  return (
    <div className={`overflow-x-auto ${props.className}`}>
      <div className="transition border border-slate-300 dark:border-zinc-700 rounded-2xl overflow-hidden shadow hover:shadow-md min-w-full inline-block overflow-x-auto">
        <table {...props} className="min-w-full">
          {props.children}
        </table>
      </div>
    </div>
  );
};

const THead: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>> = props => {
  return (
    <thead
      {...props}
      className={`bg-slate-200 dark:bg-zinc-800 border-b border-zinc-300 dark:border-zinc-700 ${props.className}`}
    >
      {props.children}
    </thead>
  );
};

const TBody: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>> = props => {
  return (
    <tbody {...props} className={`divide-y dark:divide-zinc-700 ${props.className}`}>
      {props.children}
    </tbody>
  );
};

const TR: FunctionComponent<ThHTMLAttributes<HTMLTableRowElement> & { idx: number }> = props => {
  return (
    <tr
      {...props}
      className={`${
        props.idx % 2 ? 'bg-white dark:bg-zinc-600' : 'bg-slate-50 dark:bg-zinc-500'
      } transition hover:bg-slate-100 dark:hover:bg-zinc-400 ${props.className}`}
    >
      {props.children}
    </tr>
  );
};

const TH: FunctionComponent<ThHTMLAttributes<HTMLTableCellElement>> = props => {
  return (
    <th {...props} className={`p-6 text-left ${props.className}`}>
      {props.children}
    </th>
  );
};

const TD: FunctionComponent<TdHTMLAttributes<HTMLTableCellElement>> = props => {
  return (
    <td {...props} className={`px-6 py-4 ${props.className}`}>
      {props.children}
    </td>
  );
};

Table.HeadSection = THead;
Table.BodySection = TBody;
Table.Row = TR;
Table.Head = TH;
Table.Cell = TD;

export default Table;
