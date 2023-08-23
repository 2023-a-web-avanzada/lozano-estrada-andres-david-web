'use client'

import { Employee } from "@/types/employee";

export default function EmployeesTable(
    params: {
        employees: Employee[],
        onDelete: (employeeId: number) => undefined,
    }
) {
    const { employees, onDelete } = params;

    // Handle delete action
    const handleDeleteAction = (employeeId: number | undefined) => {
        if (employeeId) {
            onDelete(employeeId);
        }
    };

    return (
        <>
            <div>
                <table className="min-w-full">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">ID</th>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Birthday</th>
                        <th className="py-2 px-4 text-left">Salary</th>
                        <th className="py-2 px-4 text-left">Position</th>
                        <th className="py-2 px-4 text-left">Insured</th>
                        <th className="py-2 px-4 text-left">Department</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr className="border-t border-gray-200" key={employee.id}>
                            <td className="py-2 px-4">{ employee.id }</td>
                            <td className="py-2 px-4">{ employee.name }</td>
                            <td className="py-2 px-4">{ new Date(employee.birthday).toLocaleDateString() }</td>
                            <td className="py-2 px-4">{ employee.salary }</td>
                            <td className="py-2 px-4">{ employee.position }</td>
                            <td className="py-2 px-4">{ employee.insured ? 'Yes' : 'No' }</td>
                            <td className="py-2 px-4">{ employee.department }</td>
                            <td className="py-2 px-4 space-x-2">
                                <a href={`employees/${employee.id}`}>
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                                        Edit
                                    </button>
                                </a>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleDeleteAction(employee.id);
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
        </>
    )
}