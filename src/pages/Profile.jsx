import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [initialUser, setInitialUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [userId, setUserId] = useState(null); // Para la API
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setInitialUser(parsedUser);
      setEditedUser(parsedUser);
      setUserId(parsedUser.id || parsedUser._id); // Ajusta según tu backend
    }
  }, []);

  useEffect(() => {
    const isChanged =
      editedUser.name !== initialUser.name ||
      editedUser.username !== initialUser.username ||
      editedUser.email !== initialUser.email;
    setHasChanges(isChanged);
  }, [editedUser, initialUser]);

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "";
  };

  const handleSaveChanges = async () => {
    if (!userId) return;

    try {
      const res = await fetch(
        `http://localhost:3001/api/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();
      const updatedUser = data.user; // Aquí extraes el usuario actualizado

      setInitialUser(updatedUser);
      setEditedUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSaveMessage("✅ Changes saved successfully!");
      setHasChanges(false);
    } catch (err) {
      console.error(err);
      setSaveMessage("❌ Error saving changes.");
    }
  };

  return (
    <div className="p-6 text-black font-bold bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-lg shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
        >
          <svg
            className="w-5 h-5 mr-2 -ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Go Back
        </button>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-sm font-semibold">
              {getInitials(editedUser.name)}
            </div>
            <div>
              <p className="font-medium text-lg">
                {editedUser.name || "Unnamed User"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                value={editedUser.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-normal"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                value={editedUser.username || ""}
                onChange={(e) => handleChange("username", e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-normal"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email address</label>
              <input
                type="email"
                value={editedUser.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-normal"
              />
            </div>

            <button
              onClick={handleSaveChanges}
              disabled={!hasChanges}
              className={`mt-2 px-4 py-2 rounded-md font-normal transition ${
                hasChanges
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
            {saveMessage && (
              <p className="mt-2 text-sm text-green-600 font-normal">
                {saveMessage}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Website Access
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>aufaitux.com</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Admin</span>
                <span className="text-gray-400 cursor-pointer">⋮</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>aufaitux.com</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Read only</span>
                <span className="text-gray-400 cursor-pointer">⋮</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
