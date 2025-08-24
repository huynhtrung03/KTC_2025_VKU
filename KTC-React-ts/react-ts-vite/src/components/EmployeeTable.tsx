import React, { useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, DatePicker, Select } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useEmployeesQuery, useUpdateEmployeeMutation } from '../services/EmployeeService';
import type { CreateEmployeeRequest, Employee, UpdateEmployeeRequest } from '../types/types';
dayjs.locale('vi');



const { Option } = Select;

const EmployeeTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Sử dụng các hooks đã tạo
  const { data, isLoading } = useEmployeesQuery(page, size);
  const deleteMutation = useDeleteEmployeeMutation();
  const updateMutation = useUpdateEmployeeMutation();
  const createMutation = useCreateEmployeeMutation();

  const handlePageChange = (newPage: number, newSize?: number) => {
    setPage(newPage - 1);
    if (newSize) {
      setSize(newSize);
    }
  };

  const handleDelete = async (employeeId: number) => {
    try {
      await deleteMutation.mutateAsync(employeeId);
      message.success('Xóa nhân viên thành công!');
    } catch (error) {
      message.error('Đã xảy ra lỗi khi xóa nhân viên.' + error);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...employee,
      dateOfBirth: dayjs(employee.dateOfBirth),
    });
  };
  
  const handleFormSubmit = async (values: CreateEmployeeRequest | UpdateEmployeeRequest) => {
    try {
      if (editingEmployee) {
        // Cập nhật
        await updateMutation.mutateAsync({
          id: editingEmployee.id,
          data: {
            ...values as UpdateEmployeeRequest,
            dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
          },
        });
        message.success('Cập nhật thành công!');
      } else {
        // Tạo mới
        await createMutation.mutateAsync({
          ...values as CreateEmployeeRequest,
          dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
        });
        message.success('Thêm nhân viên thành công!');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Thao tác thất bại.' + error);
    }
  };

  const columns = [
    { title: 'Họ và Tên', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'SĐT', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Employee) => (
        <div className="flex gap-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button icon={<DeleteOutlined />} danger>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Danh Sách Nhân Viên</h2>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            setEditingEmployee(null);
            setIsModalVisible(true);
            form.resetFields();
          }}
        >
          Thêm Nhân Viên
        </Button>
      </div>
      <Table
        dataSource={data?.data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page + 1,
          pageSize: size,
          total: data?.totalRecords,
          onChange: handlePageChange,
          // showSizeChanger: true,
        }}
      />

      <Modal
        title={editingEmployee ? "Cập Nhật Thông Tin" : "Thêm Nhân Viên Mới"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item label="Họ và Tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
            <Input />
          </Form.Item>
          {/* Email chỉ được sửa khi tạo mới, không được sửa khi update */}
          {!editingEmployee && (
             <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                <Input />
             </Form.Item>
          )}
          <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ngày sinh" name="dateOfBirth" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
            <Select>
              <Option value="MALE">Nam</Option>
              <Option value="FEMALE">Nữ</Option>
              <Option value="OTHER">Khác</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password" rules={[{ required: !editingEmployee, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password placeholder={editingEmployee ? "Để trống nếu không đổi mật khẩu" : ""} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeTable;
