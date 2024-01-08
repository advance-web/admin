import { useQuery } from 'react-query';
import { Spin, Table } from 'antd';

import useSearchColumnProps from '../../hooks/useSearchColumn';
import { getAllClassroom } from '../../services/classroom';

import ClassroomStatus from './components/ClassroomStatus';
import LockAction from './components/LockAction';
import ParticipantsTable from './components/ParticipantsTable';
const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: 'classrooms',
    queryFn: async () => {
      const { data: response } = await getAllClassroom();
      return response.data;
    },
  });
  const { getColumnSearchProps } = useSearchColumnProps();
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      ...getColumnSearchProps('subject'),
    },
    {
      title: 'Max Student',
      dataIndex: 'maxStudent',
      key: 'maxStudent',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.maxStudent - b.maxStudent,
    },
    {
      title: 'Teacher Name',
      dataIndex: 'teacherName',
      key: 'teacherName',
      ...getColumnSearchProps('teacherName'),
    },
    {
      title: 'Teacher Email',
      dataIndex: 'teacherEmail',
      key: 'teacherEmail',
      ...getColumnSearchProps('teacherEmail'),
    },
    {
      title: 'Join code',
      dataIndex: 'joinCode',
      key: 'joinCode',
    },
    {
      title: 'Status',
      dataIndex: 'isLocked',
      key: 'isLocked',
      render: (_, { active }) => <ClassroomStatus active={active} key={active} />,
    },
    {
      title: 'Classroom Action',
      key: 'action',
      render: (_, { _id, active }) => <LockAction classroomId={_id} active={active} />,
    },
  ];
  return (
    <>
      {isLoading && <Spin />}
      {data && (
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => <ParticipantsTable classroomId={record._id} />,
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={data.map((row) => {
            return {
              ...row,
              teacherName: row.teacher.name,
              teacherEmail: row.teacher.email,
              key: row._id,
            };
          })}
          pagination={{ defaultPageSize: 5, pageSize: 5 }}
        />
      )}
    </>
  );
};
export default App;
