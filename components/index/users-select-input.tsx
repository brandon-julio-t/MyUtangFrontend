import User from '../../models/User';
import { AppRootState } from '../../stores/app';
import { gql, useQuery } from '@apollo/client';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UsersSelectInput: FunctionComponent<{
  userId: string;
  onUserChange: (userId: string) => void;
  disabled?: boolean;
}> = ({ userId, onUserChange, disabled, ...rest }) => {
  const { data, loading } = useQuery<{ users: User[] }>(GQL);
  const currentUser = useSelector<AppRootState, User | null>(
    state => state.app.user
  );
  const people = data?.users ?? [];

  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people.filter(person => person.id !== currentUser?.id)
      : people.filter(
          person =>
            person.id !== currentUser?.id &&
            person.userName
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (data?.users) {
      setSelected(data?.users[0]);
    }
  }, [data?.users]);

  useEffect(() => {
    if (!userId && data?.users.length) {
      onUserChange(data.users[0].id);
    }
  }, [data?.users, onUserChange, userId]);

  return (
    <Combobox
      {...rest}
      value={selected}
      onChange={setSelected}
      disabled={loading}
    >
      <div className='relative mt-1'>
        <div className='relative w-full text-left cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden'>
          <Combobox.Input
            className='w-full border border-slate-300 focus:border-slate-400 rounded-lg dark:caret-zinc-400 dark:placeholder-zinc-400 dark:text-white dark:border-zinc-700 focus:ring-0 py-2 pl-3 pr-10 leading-5 text-gray-900 bg-white dark:bg-zinc-800'
            displayValue={(person: User) => person.userName}
            onChange={event => setQuery(event.target.value)}
            defaultValue='Loading...'
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <SelectorIcon
              className='w-5 h-5 text-gray-400'
              aria-hidden='true'
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-zinc-700 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredPeople.length === 0 && query !== '' ? (
              <div className='cursor-default select-none relative py-2 px-4 text-gray-700'>
                Username not found.
              </div>
            ) : (
              filteredPeople.map(person => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active
                        ? 'text-black dark:text-white bg-zinc-100 dark:bg-zinc-800'
                        : 'text-gray-900 dark:text-zinc-100'
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.userName}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active
                              ? 'text-black dark:text-white'
                              : 'text-zinc-600 dark:text-slate-300'
                          }`}
                        >
                          <CheckIcon className='w-5 h-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

const GQL = gql`
  query GetAllUsers {
    users {
      id
      userName
    }
  }
`;

export default UsersSelectInput;
