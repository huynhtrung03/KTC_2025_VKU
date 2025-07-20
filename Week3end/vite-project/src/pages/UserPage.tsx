import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userservices";
import {
  addRoleToUser,
  getRoles,
  getUsersByRole,
  removeRoleFromUser, // Thêm hàm này trong roleservices.ts như hướng dẫn ở trên
} from "../services/roleservices";

type User = {
  id: number;
  fullName: string;
  username: string;
  status: string;
  roles?: { id: number; name: string }[];
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [checkedRoles, setCheckedRoles] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [removeMode, setRemoveMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await fetchUsers()) as any[];
      setUsers(res || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getRoles()) as any[];
      setRoles(res || []);
    };
    fetchData();
  }, []);

  // Thêm role: chỉ hiện role user chưa có
  const handleAddRole = async (user: User) => {
    setSelectedUser(user);
    setCheckedRoles([]);
    setShowPopup(true);
    setRemoveMode(false);

    const rolesOfUser: any[] = [];
    for (const role of roles) {
      const usersInRole = (await getUsersByRole(role.id)) as any[];
      if (usersInRole && usersInRole.some((u: any) => u.id === user.id)) {
        rolesOfUser.push(role);
      }
    }
    const rolesUserNotHave = roles.filter(
      (role: any) => !rolesOfUser.some((r: any) => r.id === role.id)
    );
    setUserRoles(rolesUserNotHave);
  };

  // Xóa role: chỉ hiện role user đang có
  const handleRemoveRole = async (user: User) => {
    setSelectedUser(user);
    setCheckedRoles([]);
    setShowPopup(true);
    setRemoveMode(true);

    const rolesOfUser: any[] = [];
    for (const role of roles) {
      const usersInRole = (await getUsersByRole(role.id)) as any[];
      if (usersInRole && usersInRole.some((u: any) => u.id === user.id)) {
        rolesOfUser.push(role);
      }
    }
    setUserRoles(rolesOfUser);
  };

  const handleRoleCheck = (roleId: number) => {
    setCheckedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSubmitRoles = async () => {
    if (!selectedUser) return;
    setLoading(true);
    if (removeMode) {
      for (const roleId of checkedRoles) {
        await removeRoleFromUser(selectedUser.id, roleId);
      }
    } else {
      for (const roleId of checkedRoles) {
        await addRoleToUser(selectedUser.id, roleId);
      }
    }
    setLoading(false);
    setShowPopup(false);
    setCheckedRoles([]);
    setSelectedUser(null);
    setRemoveMode(false);
    // Reload lại user list để cập nhật role mới
    const res = (await fetchUsers()) as any[];
    setUsers(res || []);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          User List
        </h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border border-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-blue-50">
              <tr>
                <th className="py-2 px-4 border-b border-gray-100 font-semibold text-gray-700">
                  ID
                </th>
                <th className="py-2 px-4 border-b border-gray-100 font-semibold text-gray-700">
                  Full Name
                </th>
                <th className="py-2 px-4 border-b border-gray-100 font-semibold text-gray-700">
                  Username
                </th>
                <th className="py-2 px-4 border-b border-gray-100 font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-2 px-4 border-b border-gray-100 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-4 border-b border-gray-100 text-center">
                    {user.id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100">
                    {user.fullName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100">
                    {user.username}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100">
                    {user.status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100 flex justify-center gap-2">
                    <button
                      className="bg-[#7f7fd5] hover:bg-[#6c6cd1] text-white px-2 py-2 rounded-2xl"
                      onClick={() => handleAddRole(user)}
                    >
                      Add
                    </button>
                    <button
                      className="bg-[#7f7fd5] hover:bg-[#6c6cd1] text-white px-2 py-2 rounded-2xl ml-2"
                      onClick={() => handleRemoveRole(user)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup thêm/xóa role */}
      {showPopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">
              {removeMode
                ? `Xóa role khỏi ${selectedUser.fullName}`
                : `Thêm role cho ${selectedUser.fullName}`}
            </h3>
            <div className="mb-4">
              {userRoles.length > 0 ? (
                userRoles.map((role: any) => (
                  <label key={role.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={checkedRoles.includes(role.id)}
                      onChange={() => handleRoleCheck(role.id)}
                    />
                    {role.name}
                  </label>
                ))
              ) : (
                <div className="text-gray-500 text-center">
                  {removeMode
                    ? "User chưa có role nào."
                    : "User đã có tất cả các role."}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => {
                  setShowPopup(false);
                  setRemoveMode(false);
                }}
                disabled={loading}
              >
                Đóng
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  removeMode
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
                onClick={handleSubmitRoles}
                disabled={loading || checkedRoles.length === 0}
              >
                {loading
                  ? removeMode
                    ? "Đang xóa..."
                    : "Đang thêm..."
                  : removeMode
                  ? "Xóa role"
                  : "Thêm role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}