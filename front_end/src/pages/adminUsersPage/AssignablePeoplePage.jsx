import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
import { useAssignablePeople } from "../../hooks/userHooks/useAssignablePeople";
import { useCreateAssignablePerson } from "../../hooks/userHooks/useCreateAssignablePerson";
import { useDeleteAssignablePerson } from "../../hooks/userHooks/useDeleteAssignablePerson";

export default function AssignablePeoplePage() {

    const {
        data: currentData,
        isLoading: currentLoading,
    } = useCurrentUser();

    const user = currentData?.data;

    const {
        data: peopleData,
        isLoading: peopleLoading,
        isError: peopleError,
        refetch,
    } = useAssignablePeople({
        enabled: user?.role === "admin",
    });

    const createMutation =
        useCreateAssignablePerson();

    const deleteMutation =
        useDeleteAssignablePerson();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [position, setPosition] =
        useState("");

    const people =
        peopleData?.data || [];

    const handleCreate = async (event) => {

        event.preventDefault();

        if (
            !name ||
            !email ||
            !position
        ) {
            toast.error(
                "All fields are required"
            );
            return;
        }

        try {

            await createMutation.mutateAsync({
                name,
                email,
                position,
            });

            toast.success(
                "Assignable person added"
            );

            setName("");
            setEmail("");
            setPosition("");

            refetch();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Could not add person"
            );

        }
    };

    const handleDelete = async (id) => {

        try {

            await deleteMutation.mutateAsync(id);

            toast.success(
                "Assignable person deleted"
            );

            refetch();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Could not delete person"
            );

        }
    };

    if (
        currentLoading ||
        peopleLoading
    ) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                Loading assignable people...
            </div>
        );
    }

    if (peopleError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500">
                Failed to load assignable people.
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-8">

            <div className="mx-auto max-w-7xl space-y-8">

                {/* HERO */}

                <section
                    className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-6
                        md:p-8
                        shadow-xl
                    "
                >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div>

                            <p
                                className="
                                    text-blue-400
                                    uppercase
                                    tracking-widest
                                    text-sm
                                "
                            >
                                Admin Management
                            </p>

                            <h1
                                className="
                                    mt-2
                                    text-3xl
                                    md:text-4xl
                                    font-bold
                                "
                            >
                                Assignable People
                            </h1>

                            <p
                                className="
                                    mt-3
                                    text-slate-400
                                    max-w-2xl
                                "
                            >
                                Manage the list of people who
                                can be assigned tickets by
                                administrators.
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-4">

                            <div
                                className="
                                    rounded-2xl
                                    bg-slate-800
                                    px-6
                                    py-4
                                "
                            >
                                <p className="text-slate-400 text-sm">
                                    Total Assignees
                                </p>

                                <p className="text-3xl font-bold mt-1">
                                    {people.length}
                                </p>

                            </div>

                            <Link
                                to="/all-tickets"
                                className="
                                    rounded-2xl
                                    bg-blue-600
                                    px-6
                                    py-4
                                    font-medium
                                    transition-all
                                    duration-300
                                    hover:bg-blue-700
                                    hover:scale-105
                                "
                            >
                                View Tickets
                            </Link>

                        </div>

                    </div>

                </section>

                {/* ADD PERSON */}

                <section
                    className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-6
                        md:p-8
                        shadow-xl
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-semibold
                            mb-6
                        "
                    >
                        Add Assignable Person
                    </h2>

                    <form
                        onSubmit={handleCreate}
                        className="
                            grid
                            gap-5
                            md:grid-cols-3
                        "
                    >

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Full Name"
                            className="
                                rounded-xl
                                bg-slate-800
                                border
                                border-slate-700
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                                transition
                            "
                        />

                        <input
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Email Address"
                            className="
                                rounded-xl
                                bg-slate-800
                                border
                                border-slate-700
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                                transition
                            "
                        />

                        <input
                            value={position}
                            onChange={(e) =>
                                setPosition(e.target.value)
                            }
                            placeholder="Position"
                            className="
                                rounded-xl
                                bg-slate-800
                                border
                                border-slate-700
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                                transition
                            "
                        />

                        <div className="md:col-span-3">

                            <button
                                type="submit"
                                disabled={
                                    createMutation.isPending
                                }
                                className="
                                    rounded-xl
                                    bg-blue-600
                                    px-6
                                    py-3
                                    font-medium
                                    transition-all
                                    duration-300
                                    hover:bg-blue-700
                                    hover:scale-105
                                "
                            >
                                {
                                    createMutation.isPending
                                        ? "Adding..."
                                        : "Add Person"
                                }
                            </button>

                        </div>

                    </form>

                </section>

                {/* DESKTOP TABLE */}

                <section
                    className="
                        hidden
                        lg:block
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        overflow-hidden
                        shadow-xl
                    "
                >

                    <table className="w-full">

                        <thead>

                            <tr className="bg-slate-800">

                                <th className="p-5 text-left">
                                    Name
                                </th>

                                <th className="p-5 text-left">
                                    Email
                                </th>

                                <th className="p-5 text-left">
                                    Position
                                </th>

                                <th className="p-5 text-left">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {people.map((person) => (

                                <tr
                                    key={person._id}
                                    className="
                                        border-t
                                        border-slate-800
                                        hover:bg-slate-800/50
                                        transition
                                    "
                                >

                                    <td className="p-5">
                                        {person.name}
                                    </td>

                                    <td className="p-5">
                                        {person.email}
                                    </td>

                                    <td className="p-5">
                                        {person.position}
                                    </td>

                                    <td className="p-5">

                                        <button
                                            onClick={() =>
                                                handleDelete(person._id)
                                            }
                                            className="
                                                rounded-xl
                                                bg-red-600
                                                px-4
                                                py-2
                                                transition
                                                hover:bg-red-700
                                            "
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </section>

                {/* MOBILE CARDS */}

                <section
                    className="
                        lg:hidden
                        grid
                        gap-4
                    "
                >

                    {people.map((person) => (

                        <div
                            key={person._id}
                            className="
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-900
                                p-5
                                shadow-lg
                                transition-all
                                duration-300
                                hover:border-blue-500
                            "
                        >

                            <h3 className="font-semibold text-lg">
                                {person.name}
                            </h3>

                            <p className="text-slate-400 mt-2">
                                {person.email}
                            </p>

                            <p className="text-blue-400 mt-2">
                                {person.position}
                            </p>

                            <button
                                onClick={() =>
                                    handleDelete(person._id)
                                }
                                className="
                                    mt-4
                                    w-full
                                    rounded-xl
                                    bg-red-600
                                    py-2
                                    transition
                                    hover:bg-red-700
                                "
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </section>

            </div>

        </div>

    );

}