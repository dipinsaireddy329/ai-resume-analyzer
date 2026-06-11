import { useEffect, useState } from 'react';
import { http } from '../api/http.js';
import { StatCard } from '../components/StatCard.jsx';

export function AdminPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([http.get('/api/admin/stats'), http.get('/api/admin/users')]).then(([statsRes, usersRes]) => {
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
    });
  }, []);

  async function updateRole(id, role) {
    const { data } = await http.patch(`/api/admin/users/${id}`, { role });
    setUsers((current) => current.map((user) => (user._id === id ? data.user : user)));
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Users" value={stats?.users ?? '-'} />
        <StatCard label="Admins" value={stats?.admins ?? '-'} />
        <StatCard label="Resumes" value={stats?.resumes ?? '-'} />
        <StatCard label="Analyses" value={stats?.analyses ?? '-'} />
      </div>
      <section className="panel">
        <h1 className="mb-4 text-xl font-bold">User Management</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-steel"><tr><th className="py-3">Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b last:border-0" key={user._id}>
                  <td className="py-3 font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select className="input w-32" value={user.role} onChange={(e) => updateRole(user._id, e.target.value)}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
