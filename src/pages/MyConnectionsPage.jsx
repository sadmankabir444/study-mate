import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const MyConnectionsPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRequest, setEditingRequest] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/partner-requests?email=${user.email}`
        );
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user]);

  const handleDelete = async (request) => {
    setDeleteModal(request);
  };

  const confirmDelete = async () => {
    const request = deleteModal;
    try {
      await fetch(`http://localhost:5000/partner-requests/${request._id}`, {
        method: "DELETE",
      });
      await fetch(
        `http://localhost:5000/partners/${request.partnerId}/decrease-count`,
        { method: "PATCH" }
      );
      setRequests((prev) => prev.filter((r) => r._id !== request._id));
      toast.success("Request deleted and partner count updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete request or update partner count");
    } finally {
      setDeleteModal(null);
    }
  };

  const handleEdit = (r) => setEditingRequest(r);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = {
        partnerName: editingRequest.partnerName,
        subject: editingRequest.subject,
        studyMode: editingRequest.studyMode,
      };

      const res = await fetch(
        `http://localhost:5000/partner-requests/${editingRequest._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed on server");

      toast.success("Request updated successfully!");
      setRequests((prev) =>
        prev.map((r) =>
          r._id === editingRequest._id ? { ...r, ...updates } : r
        )
      );
      setEditingRequest(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Update failed on server");
    }
  };

  if (loading) return <div className="text-center py-10">Loading your connections...</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Connections</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-indigo-100 text-gray-700">
              <th className="py-3 px-6">Profile</th>
              <th className="py-3 px-6">Subject</th>
              <th className="py-3 px-6">Study Mode</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 flex items-center space-x-3">
                  <img
                    src={r.partnerImage}
                    alt={r.partnerName}
                    className="w-12 h-12 rounded-full"
                  />
                  <span>{r.partnerName}</span>
                </td>
                <td className="py-3 px-6">{r.subject}</td>
                <td className="py-3 px-6">{r.studyMode}</td>
                <td className="py-3 px-6 space-x-2">
                  <button
                    onClick={() => handleEdit(r)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(r)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Update Request</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Partner Name</label>
                <input
                  type="text"
                  value={editingRequest.partnerName}
                  onChange={(e) =>
                    setEditingRequest((prev) => ({
                      ...prev,
                      partnerName: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Subject</label>
                <input
                  type="text"
                  value={editingRequest.subject}
                  onChange={(e) =>
                    setEditingRequest((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Study Mode</label>
                <select
                  value={editingRequest.studyMode}
                  onChange={(e) =>
                    setEditingRequest((prev) => ({ ...prev, studyMode: e.target.value }))
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">Delete Connection</h2>
            <p className="mb-6">Are you sure you want to delete this connection?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyConnectionsPage;
