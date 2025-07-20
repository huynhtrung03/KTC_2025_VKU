import apiClient from "../lib/api-client-sp";

export async function getRoles() {
  try {
    const res = await apiClient.get("/security/roles");
    return res;
  } catch (e) {
    console.error("Fetch roles error:", e);
    return [];
  }
}

export async function getUsersByRole(roleId: number) {
  try {
    const res = await apiClient.get(`/security/roles/${roleId}/users`);
    return res;
  } catch (e) {
        console.error("Fetch users by role error:", e);
        return [];
    }
}

export async function addRoleToUser(userId: number, roleId: number) {
  try {
    const res = await apiClient.put(
      `/security/users/${userId}/add-role-to-user`,
      { role_id: roleId }
    );
    return res;
  } catch (e) {
    console.error("Add role to user error:", e);
    return null;
  }
}
export async function removeRoleFromUser(userId: number, roleId: number) {
  try {
    const res = await apiClient.put(
      `/security/users/${userId}/remove-role-from-user`,
      { role_id: roleId }
    );
    return res;
  } catch (e) {
    console.error("Remove role from user error:", e);
    return null;
  }
}

export async function createRole(role: {
  code: string;
  name: string;
  description?: string;
}) {
  try {
    const res = await apiClient.post("/security/roles", role);
    return res;
  } catch (e) {
    console.error("Create role error:", e);
    return null;
  }
}