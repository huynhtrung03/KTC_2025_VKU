import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userservices";
import { addRoleToUser, getRoles, getUsersByRole, removeRoleFromUser } from "../services/roleservices";
import { PlusCircle, MinusCircle } from "lucide-react";

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
   
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex flex-col items-center py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-sky-800 text-center uppercase tracking-wide">
          User List
        </h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gradient-to-r from-sky-200 to-blue-300 text-gray-800">
              <tr>
                <th className="py-3 px-5 border-b font-semibold">ID</th>
                <th className="py-3 px-5 border-b font-semibold">Full Name</th>
                <th className="py-3 px-5 border-b font-semibold">Username</th>
                <th className="py-3 px-5 border-b font-semibold">Status</th>
                <th className="py-3 px-5 border-b font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-sky-100 transition">
                  <td className="py-3 px-5 border-b text-center">{user.id}</td>
                  <td className="py-3 px-5 border-b">{user.fullName}</td>
                  <td className="py-3 px-5 border-b">{user.username}</td>
                  <td className="py-3 px-5 border-b">{user.status}</td>
                  <td className="py-3 px-5 border-b flex justify-center gap-4">
                    <button
                      className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-full shadow-lg"
                      onClick={() => handleAddRole(user)}
                      title="Add Role"
                    >
                      <PlusCircle size={20} />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                      onClick={() => handleRemoveRole(user)}
                      title="Remove Role"
                    >
                      <MinusCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-center text-sky-700">
              {removeMode ? `Xóa role khỏi ${selectedUser.fullName}` : `Thêm role cho ${selectedUser.fullName}`}
            </h3>
            <div className="mb-6 max-h-64 overflow-auto">
              {userRoles.length > 0 ? (
                userRoles.map((role: any) => (
                  <label key={role.id} className="flex items-center mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-3 w-5 h-5 text-sky-600 accent-sky-500"
                      checked={checkedRoles.includes(role.id)}
                      onChange={() => handleRoleCheck(role.id)}
                    />
                    <span className="text-gray-700 font-medium">{role.name}</span>
                  </label>
                ))
              ) : (
                <div className="text-gray-500 text-center">
                  {removeMode ? "User chưa có role nào." : "User đã có tất cả các role."}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-5 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
                onClick={() => {
                  setShowPopup(false);
                  setRemoveMode(false);
                }}
                disabled={loading}
              >
                Đóng
              </button>
              <button
                className={`px-5 py-2 rounded-xl font-semibold text-white ${
                  removeMode ? "bg-red-600 hover:bg-red-700" : "bg-sky-600 hover:bg-sky-700"
                }`}
                onClick={handleSubmitRoles}
                disabled={loading || checkedRoles.length === 0}
              >
                {loading ? (removeMode ? "Đang xóa..." : "Đang thêm...") : removeMode ? "Xóa role" : "Thêm role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}