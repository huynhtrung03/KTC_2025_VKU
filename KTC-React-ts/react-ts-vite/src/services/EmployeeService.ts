import apiClient from "../lib/api-client";
import type { CreateEmployeeRequest, Employee, PaginationResponse, UpdateEmployeeRequest } from "../types/types";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


const fetchEmployees = async (page: number, size: number): Promise<PaginationResponse<Employee>> => {
    const response = await apiClient.get(`/employees`,{
        params: { page, size }
    });
    return response.data;
}

export const useEmployeesQuery = (page: number, size: number) => {
    return useQuery({
        queryKey: ['employees', page, size],
        queryFn: () => fetchEmployees(page, size)
    })
};

const createEmployee = (data: CreateEmployeeRequest) => {
    return apiClient.post(`/employees`, data);
};

export const useCreateEmployeeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        }
    })
}

const updateEmployee = ({id, data} : {id: number, data: UpdateEmployeeRequest}) => {
    return apiClient.put(`/employees/${id}`, data);
};

export const useUpdateEmployeeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        }
    })
}
const deleteEmployee = (id: number) => {
    return apiClient.delete(`/employees/${id}`);
};
export const useDeleteEmployeeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        }
    })
}



