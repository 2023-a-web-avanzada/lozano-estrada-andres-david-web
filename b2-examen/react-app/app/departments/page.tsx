'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { Department } from "@/types/department";
import DepartmentsTable from "@/app/components/departments-table";

const url = 'http://localhost:3030/departments';

export default function Page() {
    const [ departments, setDepartments ] = useState([] as Department[]);
    const router = useRouter();

    useEffect(() => {
        getAllDepartments().then();
    }, []);

    // Get all departments
    async function getAllDepartments() {
        const response = await axios.get(url)

        if (response.statusText === 'OK') {
            setDepartments(response.data);
        }
    }

    // Handle create action
    const handleCreateAction = () => {
        router.push("/departments/create");
    };

    // Handle delete action
    const handleDeleteAction = async (departmentId: number) => {
        try {
            const response = await axios.delete(url + `/${departmentId}`)

            if (response.statusText === 'OK') {
                getAllDepartments().then(() => undefined);
            }
        } catch (error) {
            console.error('Error while deleting department:', error);
        }
    };

    return (
        <>
            <div className={ 'bg-slate-100 h-screen w-screen text-neutral-950 p-12 py-10' }>
                {/* HEADER */}
                <div className={ 'py-2 mb-7' }>
                    <a className={ 'text-3xl font-bold hover:text-blue-900' } href={ './departments' }>
                        REST API: Departments - Employees
                    </a>
                </div>

                {/* DEPARTMENTS OPTIONS */}
                <div className={ 'flex min-h-[75px] items-center bg-slate-300 mb-9 ' +
                    'rounded-xl border-2 border-slate-200' }>
                    <h3 className={ 'ml-5 w-full text-xl font-bold' }>
                        Departments
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
                    {/* DEPARTMENTS LIST */}
                    <DepartmentsTable
                        departments={ departments }
                        onDelete={ departmentId => { handleDeleteAction(departmentId).then() } }
                    />
                </div>
            </div>
        </>
    )
}