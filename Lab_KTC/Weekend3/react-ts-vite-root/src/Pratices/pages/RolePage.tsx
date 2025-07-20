/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { createRole, getRoles } from "../services/roleservices";

type Role = {
  id: number;
  code: string;
  name: string;
  description: string | null;
};

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newRole, setNewRole] = useState({
    code: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getRoles()) as any[];
      setRoles(res || []);
    };
    fetchData();
  }, []);

  const handleAddRole = () => {
    setShowPopup(true);
    setNewRole({ code: "", name: "", description: "" });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewRole({ code: "", name: "", description: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value });
  };
  const handleSubmitRole = async () => {
    if (!newRole.code || !newRole.name) {
      alert("Code and Name are required");
      return;
    }
    const res = (await createRole(newRole)) as any;
    if (res) {
      setRoles([...roles, res]);
      handleClosePopup();
    } else {
      alert("Failed to create role");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700 text-center">
            Role List
          </h2>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow"
            onClick={handleAddRole}
          >
            + Thêm role
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border border-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-purple-50">
              <tr>
                <th className="py-2 px-4 border-b border-gray-100 font-semibold text-gray-700">
                  ID
                </th>
                <th className="py-2 px-4 border-b border-gray-100 font-semibold text-gray-700">
                  Code
                </th>
                <th className="py-2 px-4 border-b border-gray-100 font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-gray-100 font-semibold text-gray-700">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-purple-50 transition">
                  <td className="py-2 px-4 border-b border-gray-100 text-center">
                    {role.id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100">
                    {role.code}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100">
                    {role.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100">
                    {role.description ?? ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup thêm role */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">
              Thêm Role Mới
            </h3>
            <div className="mb-4">
              <input
                type="text"
                name="code"
                placeholder="Code"
                value={newRole.code}
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newRole.name}
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newRole.description}
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={handleClosePopup}
              >
                Đóng
              </button>
              <button
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleSubmitRole}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}