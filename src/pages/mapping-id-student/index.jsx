import { useContext, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import PropTypes from 'prop-types';

import NotificationContext from '../../contexts/notification/notificationContext';
import { createAndUpdateIdMappingByAdmin, getAllUser } from '../../services/account';

const EditableCell = ({ editing, dataIndex, title, inputType, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const AdminMappingIdStudent = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const { openNotification } = useContext(NotificationContext);

  useEffect(() => {
    const getAllStudents = async () => {
      const dataRespond = await getAllUser();
      console.log('Data respond: ', dataRespond);

      const dataSource = dataRespond.data.data
        .filter((user) => user.role === 'student')
        .map((student) => {
          const dataStudent = {
            key: student.id,
            name: student.name,
            email: student.email,
            idMapping: student.idMapping,
          };
          return dataStudent;
        });
      console.log('Datasource: ', dataSource);
      setData(dataSource);
    };
    getAllStudents();
  }, []);

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        const idUser = item.key;
        const dataMappingId = {
          id: row.idMapping,
        };

        console.log('Data mapping id: ', dataMappingId);

        const updatedIdMappingRes = await createAndUpdateIdMappingByAdmin(idUser, dataMappingId);
        console.log('Mapping respond: ', updatedIdMappingRes);
        if (updatedIdMappingRes.data.status == 'success') {
          setData(newData);
        }

        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      openNotification({
        type: 'error',
        title: 'Cập nhật mã số sinh viên',
        description: 'Mã số sinh viên đã tồn tại',
      });
    }
  };
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      width: '25%',
    },
    {
      title: 'Fullname',
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: 'Id mapping',
      dataIndex: 'idMapping',
      width: '15%',
      editable: true,
    },
    {
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default AdminMappingIdStudent;

EditableCell.propTypes = {
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  inputType: PropTypes.string,
  children: PropTypes.node,
  restProps: PropTypes.object,
};
