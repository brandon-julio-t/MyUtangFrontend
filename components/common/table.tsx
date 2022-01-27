import { FunctionComponent, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

const Table: FunctionComponent<HTMLAttributes<HTMLTableElement>> & {
  HeadSection: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>>;
  BodySection: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>>;
  Row: FunctionComponent<ThHTMLAttributes<HTMLTableRowElement> & { idx: number }>;
  Head: FunctionComponent<ThHTMLAttributes<HTMLTableCellElement>>;
  Cell: FunctionComponent<TdHTMLAttributes<HTMLTableCellElement>>;
} = ({ className, children, ...rest }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="transition border border-slate-300 dark:border-zinc-700 rounded-2xl overflow-hidden shadow hover:shadow-md min-w-full inline-block overflow-x-auto">
        <table {...rest} className="min-w-full">
          {children}
        </table>
      </div>
    </div>
  );
};

const THead: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>> = ({ className, children, ...rest }) => {
  return (
    <thead
      {...rest}
      className={`bg-slate-200 dark:bg-zinc-800 border-b border-zinc-300 dark:border-zinc-700 ${className}`}
    >
      {children}
    </thead>
  );
};

const TBody: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>> = ({ className, children, ...rest }) => {
  return (
    <tbody {...rest} className={`divide-y dark:divide-zinc-700 ${className}`}>
      {children}
    </tbody>
  );
};

const TR: FunctionComponent<ThHTMLAttributes<HTMLTableRowElement> & { idx: number }> = ({
  className,
  children,
  idx,
  ...rest
}) => {
  return (
    <tr
      {...rest}
      className={`${
        idx % 2 ? 'bg-slate-50 dark:bg-zinc-600/50' : 'bg-white dark:bg-zinc-600/75'
      } transition hover:bg-slate-100 dark:hover:bg-zinc-600 ${className}`}
    >
      {children}
    </tr>
  );
};

const TH: FunctionComponent<ThHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...rest }) => {
  return (
    <th {...rest} className={`p-6 text-left font-medium ${className}`}>
      {children}
    </th>
  );
};

const TD: FunctionComponent<TdHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...rest }) => {
  return (
    <td {...rest} className={`px-6 py-4 ${className}`}>
      {children}
    </td>
  );
};

Table.HeadSection = THead;
Table.BodySection = TBody;
Table.Row = TR;
Table.Head = TH;
Table.Cell = TD;

export default Table;
