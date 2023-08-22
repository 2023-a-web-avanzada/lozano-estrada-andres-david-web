'use client'

import { Department } from "@/types/department";

export default function DepartmentsTable(
    params: {
        departments: Department[],
        onDelete: (departmentId: number) => undefined,
    }
) {
    const { departments, onDelete } = params;

    // Handle delete action
    const handleDeleteAction = (departmentId: number | undefined) => {
        if (departmentId) {
            onDelete(departmentId);
        }
    };

    return (
        <div>
            <table className="min-w-full">
                <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">ID</th>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Budget</th>
                    <th className="py-2 px-4 text-left">Active</th>
                    <th className="py-2 px-4 text-left">Location</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                </tr>
                </thead>

                <tbody>
                {departments.map(department => (
                    <tr className="border-t border-gray-200" key={ department.id }>
                        <td className="py-2 px-4">{ department.id }</td>
                        <td className="py-2 px-4">{ department.name }</td>
                        <td className="py-2 px-4">{ department.budget }</td>
                        <td className="py-2 px-4">{ department.active ? 'True' : 'False'}</td>
                        <td className="py-2 px-4">{ department.location }</td>
                        <td className="py-2 px-4 space-x-2">
                            <a href={ `departments/${ department.id }/employees` }>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                    List Employees
                                </button>
                            </a>
                            <a href={ `departments/${ department.id }` }>
                                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                                    Edit
                                </button>
                            </a>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                onClick={ event => {
                                    event.preventDefault();
                                    handleDeleteAction(department.id);
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}