import { gql, useQuery } from '@apollo/client';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debt from '../../models/Debt';
import { AppRootState } from '../../stores/app';
import { loadLendings } from '../../stores/index-slice';
import DebtsCard from './debts-card';

const MyLendings: FunctionComponent = () => {
  const lendings = useSelector<AppRootState, Debt[]>(state => state.index.lendings);
  const dispatch = useDispatch();

  const { data, loading } = useQuery<{ unpaidLendings: Debt[] }>(GQL);

  useEffect(() => {
    dispatch(loadLendings(data?.unpaidLendings ?? []));
  }, [data?.unpaidLendings, dispatch]);

  return <DebtsCard debts={lendings} loading={loading} isLending={true} />;
};

const GQL = gql`
  query GetUnpaidLendings {
    unpaidLendings {
      id
      title
      description
      amount
      debtor {
        userName
      }
    }
  }
`;

export default MyLendings;
