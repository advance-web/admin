import { useQuery } from 'react-query';
import { Spin, Table } from 'antd';

import { getAllClassroom } from '../../services/classroom';

import ParticipantsTable from './components/ParticipantsTable';
const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Max Student',
    dataIndex: 'maxStudent',
    key: 'maxStudent',
  },
  {
    title: 'Teacher Name',
    dataIndex: 'teacherName',
    key: 'teacherName',
  },
  {
    title: 'Teacher Email',
    dataIndex: 'teacherEmail',
    key: 'teacherEmail',
  },
  {
    title: 'Join code',
    dataIndex: 'joinCode',
    key: 'joinCode',
  },
];
const App = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: 'classrooms',
    queryFn: getAllClassroom,
  });
  return (
    <>
      {isLoading && <Spin />}
      {response && (
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => <ParticipantsTable classroomId={record._id} />,
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={response.data.data.map((row) => {
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
