import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmployeeTable from './components/EmployeeTable';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
// import 'antd/dist/antd.css';

const queryClient = new QueryClient();

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <QueryClientProvider client={queryClient}>
        <div className="p-8 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Quản Lý Nhân Viên</h1>
          <EmployeeTable />
        </div>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
