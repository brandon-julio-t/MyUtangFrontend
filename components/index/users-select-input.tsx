import User from '../../models/User';
import { AppRootState } from '../../stores/app';
import Input from '../common/input';
import { gql, useQuery } from '@apollo/client';
import { FunctionComponent, useEffect } from 'react';
import { Else, If, Then } from 'react-if';
import { useSelector } from 'react-redux';

const UsersSelectInput: FunctionComponent<{
  userId: string;
  onUserChange: (userId: string) => void;
  disabled?: boolean;
}> = ({ userId, onUserChange, disabled, ...rest }) => {
  const { data, loading } = useQuery<{ users: User[] }>(GQL);
  const user = useSelector<AppRootState, User | null>(state => state.app.user);

  const selectUsersOtherThanCurrentUser = (users: User[]) => {
    return users.filter(u => u.id !== user?.id);
  };

  useEffect(() => {
    if (!userId && data?.users.length) {
      onUserChange(data.users[0].id);
    }
  }, [data?.users, onUserChange, userId]);

  return (
    <Input
      {...rest}
      type='select'
      onChange={e => onUserChange(e.target.value)}
      value={userId}
      disabled={disabled || loading}>
      <If condition={loading}>
        <Then>
          <option>Loading...</option>
        </Then>
        <Else>
          <option value=''>-- Select User --</option>
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
