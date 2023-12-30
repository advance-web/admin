import { useQuery } from 'react-query';
import { Spin, Table, Tag, Typography } from 'antd';
import PropTypes from 'prop-types';

import { getClassroomParticipant } from '../../../services/classroom';

const columns = [
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
    render: (_, { role }) => (
      <Tag color={role === 'teacher' ? 'volcano' : 'green'} key={role}>
        {role.toUpperCase()}
      </Tag>
    ),
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
];

const ParticipantsTable = ({ classroomId }) => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['participant', classroomId],
    queryFn: () => getClassroomParticipant(classroomId),
  });
  return (
    <>
      <Typography.Text strong>Classroom participants:</Typography.Text>
      {response && (
        <Table
          columns={columns}
          dataSource={response.data.data.map((row) => {
            return { ...row, key: row._id };
          })}
          pagination={false}
        />
      )}
      {isLoading && <Spin />}
    </>
  );
};

ParticipantsTable.propTypes = {
  classroomId: PropTypes.string,
};

export default ParticipantsTable;
