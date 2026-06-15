import { useState } from "react";
import toast from "react-hot-toast";

import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
import { useAssignablePeople } from "../../hooks/userHooks/useAssignablePeople";
import { useCreateAssignablePerson } from "../../hooks/userHooks/useCreateAssignablePerson";
import { useDeleteAssignablePerson } from "../../hooks/userHooks/useDeleteAssignablePerson";

export default function AssignablePeoplePage() {
  const { data: currentData, isLoading: currentLoading } = useCurrentUser();
  const user = currentData?.data;

  const {
    data: peopleData,
    isLoading: peopleLoading,
    isError: peopleError,
    refetch,
  } = useAssignablePeople({ enabled: user?.role === "admin" });

  const createMutation = useCreateAssignablePerson();
  const deleteMutation = useDeleteAssignablePerson();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const people = peopleData?.data || [];

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!name || !email || !position) {
      toast.error("All fields are required");
      return;
    }

    try {
      await createMutation.mutateAsync({ name, email, position });
      toast.success("Assignable person added");
      setName("");
      setEmail("");
      setPosition("");
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not add person");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Assignable person deleted");
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not delete person");
    }
  };

  if (currentLoading || peopleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        Loading assignable people...
      </div>
    );
  }

  if (peopleError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500">
        Failed to load assignable people.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Assignable people</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">Ticket assignees</h1>
              <p className="mt-3 text-slate-600">Only admins can add, remove, and assign tickets from this approved list.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Total assignees: <span className="font-semibold text-slate-950">{people.length}</span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Position</label>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Adding..." : "Add assignable person"}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">Name</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">Email</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">Position</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <tr key={person._id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-4 text-slate-900">{person.name}</td>
                    <td className="px-4 py-4 text-slate-900">{person.email}</td>
                    <td className="px-4 py-4 text-slate-900">{person.position}</td>
                    <td className="px-4 py-4 text-slate-900">
                      <button
                        onClick={() => handleDelete(person._id)}
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-red-700 transition hover:bg-red-100"
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
