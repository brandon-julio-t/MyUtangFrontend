import { gql, useQuery } from '@apollo/client';
import { FunctionComponent, useCallback } from 'react';
import { Else, If, Then } from 'react-if';
import { useSelector } from 'react-redux';
import User from '../../models/User';
import { AppRootState } from '../../stores/app';
import Input from '../common/input';

const UsersSelectInput: FunctionComponent<{ onUserChange: (userId: string) => void }> = ({ onUserChange, ...rest }) => {
  const { data, loading } = useQuery<{ users: User[] }>(GQL);
  const user = useSelector<AppRootState, User | null>(state => state.app.user);

  const selectUsersOtherThanCurrentUser = useCallback(
    (users: User[]) => users.filter(u => u.id !== user?.id),
    [user?.id]
  );

  return (
    <Input
      {...rest}
      type="select"
      onChange={e => onUserChange(e.target.value)}
      defaultValue={data?.users[0].id}
      disabled={loading}
    >
      <If condition={loading}>
        <Then>
          <option>Loading...</option>
        </Then>
        <Else>
          {selectUsersOtherThanCurrentUser(data?.users ?? []).map(user => (
            <option key={user.id} value={user.id}>
              {user.userName}
            </option>
          ))}
        </Else>
      </If>
    </Input>
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
