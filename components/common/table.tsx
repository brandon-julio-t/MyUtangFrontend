import { FunctionComponent, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

const Table: FunctionComponent<HTMLAttributes<HTMLTableElement>> & {
  HeadSection: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>>;
  Head: FunctionComponent<ThHTMLAttributes<HTMLTableCellElement>>;
  BodySection: FunctionComponent<HTMLAttributes<HTMLTableSectionElement>>;
  Cell: FunctionComponent<TdHTMLAttributes<HTMLTableCellElement>>;
} = props => {
  return (
    <div className={`overflow-x-auto ${props.className}`}>
      <div className="transition border border-slate-300 dark:border-zinc-700 rounded-2xl overflow-hidden shadow hover:shadow-md min-w-full inline-block overflow-x-auto">
        <table {...props} className="min-w-full">{props.children}</table>
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

const TH: FunctionComponent<ThHTMLAttributes<HTMLTableCellElement>> = props => {
  return (
    <th {...props} className={`p-4 ${props.className}`}>
      {props.children}
    </th>
  );
};

const TD: FunctionComponent<TdHTMLAttributes<HTMLTableCellElement>> = props => {
  return (
    <td {...props} className={`p-4 ${props.className}`}>
      {props.children}
    </td>
  );
};

Table.HeadSection = THead;
Table.Head = TH;
Table.BodySection = TBody;
Table.Cell = TD;

export default Table;
