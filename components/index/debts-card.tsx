import Debt from '../../models/Debt';
import Card from '../common/card';
import DebtsTable from './debts-table';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FunctionComponent } from 'react';
import { Else, If, Then } from 'react-if';

const DebtsCard: FunctionComponent<{
  debts: Debt[];
  loading: boolean;
  isLending: boolean;
}> = ({ debts, loading, isLending }) => {
  return (
    <Card>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className='w-full'>
              <h2 className='flex items-center text-left text-xl font-bold'>
                <If condition={open}>
                  <Then>
                    <ChevronDownIcon className='h-6 w-6' />
                  </Then>
                  <Else>
                    <ChevronRightIcon className='h-6 w-6' />
                  </Else>
                </If>

                <span className='ml-2'>
                  {isLending ? 'My Lendings' : 'My Debts'}
                </span>
              </h2>
            </Disclosure.Button>

            <Transition
              enter='transition'
              enterFrom='transform -translate-y-4 opacity-0'
              enterTo='transform translate-y-0 opacity-100'
              leave='transition'
              leaveFrom='transform translate-y-0 opacity-100'
              leaveTo='transform -translate-y-4 opacity-0'
            >
              <Disclosure.Panel className='mt-4'>
                <DebtsTable
                  debts={debts}
                  loading={loading}
                  isLending={isLending}
                />
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </Card>
  );
};

export default DebtsCard;
