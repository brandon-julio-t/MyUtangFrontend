import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FunctionComponent } from 'react';
import { Else, If, Then } from 'react-if';
import Debt from '../../models/Debt';
import Card from '../common/card';
import DebtsTable from './debts-table';

const DebtsCard: FunctionComponent<{
  debts: Debt[];
  title: string;
  loading: boolean;
  emptyMessage: string;
}> = ({ debts, title, loading, emptyMessage }) => {
  return (
    <Card>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full">
              <h2 className="flex items-center text-xl text-left font-bold">
                <If condition={open}>
                  <Then>
                    <ChevronDownIcon className="h-6 w-6" />
                  </Then>
                  <Else>
                    <ChevronRightIcon className="h-6 w-6" />
                  </Else>
                </If>

                <span className="ml-2">{title}</span>
              </h2>
            </Disclosure.Button>

            <Transition
              enter="transition"
              enterFrom="transform -translate-y-4 opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform -translate-y-4 opacity-0"
            >
              <Disclosure.Panel className="mt-4">
                <DebtsTable debts={debts} loading={loading} emptyMessage={emptyMessage} />
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </Card>
  );
};

export default DebtsCard;
