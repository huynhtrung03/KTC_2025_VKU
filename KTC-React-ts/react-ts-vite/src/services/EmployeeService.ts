import apiClient from "../lib/api-client";
import type { CreateEmployeeRequest, Employee, PaginationResponse, UpdateEmployeeRequest } from "../types/types";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface PaginationParams {
    page: number;
    size: number;
}

export interface UpdateEmployeeParams {
    id: number;
    data: UpdateEmployeeRequest;
}

const employeeApi = {
    fetchEmployees: async (params: PaginationParams): Promise<PaginationResponse<Employee>> => {
        const response = await apiClient.get(`/employees`, { params });
        return response.data;
    },

    createEmployee: async (data: CreateEmployeeRequest) => {
        return apiClient.post(`/employees`, data);
    },

    updateEmployee: async ({ id, data }: UpdateEmployeeParams) => {
        return apiClient.put(`/employees/${id}`, data);
    },

    deleteEmployee: async (id: number) => {
        return apiClient.delete(`/employees/${id}`);
    },
};

export const useEmployeesQuery = (page: number, size: number) => {
    return useQuery({
        queryKey: ['employees', page, size],
        queryFn: () => employeeApi.fetchEmployees({ page, size })
    });
};

export const useCreateEmployeeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeApi.createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        }
    });
};

export const useUpdateEmployeeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeApi.updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        }
    });
};

export const useDeleteEmployeeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeApi.deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        }
    });
};