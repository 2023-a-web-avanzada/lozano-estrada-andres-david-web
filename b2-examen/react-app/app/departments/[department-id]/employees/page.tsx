'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { Employee } from "@/types/employee";
import EmployeesTable from "@/app/components/employees-table";

const url = 'http://localhost:3030/employees';

export default function Page(
    { params }: { params: { 'department-id': number | 'create' } }
) {
    const [ employees, setEmployees ] = useState([] as Employee[]);
    const router = useRouter();

    useEffect(() => {
        getAllEmployeesByDepartmentId().then();
    }, []);

    // Get all employees by department id
    async function getAllEmployeesByDepartmentId() {
        const response = await axios.get(url + `/by-department/${params['department-id']}`)

        if (response.statusText === 'OK') {
            setEmployees(response.data);
        }
    }

    // Handle create action
    const handleCreateAction = () => {
        router.push(`/departments/${params['department-id']}/employees/create`);
    };

    // Handle delete action
    const handleDeleteAction = async (employeeId: number) => {
        try {
            const response = await axios.delete(url + `/${employeeId}`)

            if (response.statusText === 'OK') {
                getAllEmployeesByDepartmentId().then(() => undefined);
            }
        } catch (error) {
            console.error('Error while deleting employee:', error);
        }
    };

    return (
        <>
            <div className={ 'bg-slate-100 h-screen w-screen text-neutral-950 p-12 py-10' }>
                {/* HEADER */}
                <div className={ 'py-2 mb-7' }>
                    <a className={ 'text-3xl font-bold hover:text-blue-900' } href={ '../../departments' }>
                        REST API: Departments - Employees
                    </a>
                </div>

                {/* EMPLOYEES OPTIONS */}
                <div className={ 'flex min-h-[75px] items-center bg-slate-300 mb-9 ' +
                    'rounded-xl border-2 border-slate-200' }>
                    <h3 className={ 'ml-5 w-full text-xl font-bold' }>
                        Employees
                    </h3>
                    <button
                        className={ 'bg-blue-500 hover:bg-blue-600 text-white ' +
                            'px-5 py-2.5 my-2.5 mx-5 rounded-xl' }
                        onClick={ event => {
                            event.preventDefault();
                            handleCreateAction();
                        }}
                    >
                        Create
                    </button>
                </div>

                <div>
                    <EmployeesTable
                        employees={ employees }
                        onDelete={ employeeId => { handleDeleteAction(employeeId).then() } }
                    />
                </div>
            </div>
        </>
    )
}