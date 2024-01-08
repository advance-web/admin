import { useQuery } from 'react-query';
import { Spin, Table } from 'antd';

import { getAllUser } from '../../services/account';

import AccountProvider from './components/AccountProvider';
import AccountRole from './components/AccountRole';
import AccountStatus from './components/AccountStatus';
import LockAction from './components/StatusAction';

const columns = [
  // {
  //   title: 'Id',
  //   dataIndex: '_id',
  //   key: 'id',
  // },
  {
    title: 'Id Mapping',
    dataIndex: 'idMapping',
    key: 'idMapping',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
    render: (_, { role }) => <AccountRole role={role} key={role} />,
  },
  {
    title: 'Status',
    dataIndex: 'isLocked',
    key: 'isLocked',
    render: (_, { isLocked }) => <AccountStatus isLocked={isLocked} key={isLocked} />,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Account provider',
    dataIndex: 'provider',
    key: 'provider',
    render: (_, { provider }) => <AccountProvider provider={provider} key={provider} />,
  },
  {
    title: 'Account action',
    key: 'action',
    render: (_, { _id, isLocked }) => <LockAction accountId={_id} isLocked={isLocked} />,
  },
];
const Account = () => {
  const { data, isLoading } = useQuery({
    queryKey: 'users',
    queryFn: async () => {
      const { data: response } = await getAllUser();
      return response.data;
    },
  });

  return (
    <>
      {isLoading && <Spin />}
      {data && (
        <Table
          columns={columns}
          dataSource={data.map((row) => {
            return {
              ...row,
              key: row._id,
            };
          })}
          pagination={{ defaultPageSize: 5, pageSize: 5 }}
        />
      )}
    </>
  );
};
export default Account;
