'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Department } from "@/types/department";

const url = 'http://localhost:3030/departments'

export default function Page(
    { params }: { params: { 'department-id': number | 'create' } }
) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const router = useRouter();

    useEffect(() => {
        if (params['department-id'] !== 'create') {
            getOneDepartmentById(params['department-id']).then();
        }
    }, []);

    // Get one department by id
    async function getOneDepartmentById(departmentId: number) {
        try {
            const response = await axios.get(url + `/${departmentId}`)

            if (response.statusText === 'OK') {
                // Fill form inputs
                if (response.data) {
                    for (const key in response.data) {
                        if (response.data.hasOwnProperty(key)) {
                            setValue(key, response.data[key]);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error while fetching department:', error);
        }
    }

    async function createDepartment(department: Department) {
        try {
            const response = await axios.post(url + '/create', department);

            if (response.statusText === 'Created') {
                router.push("../departments");
            }
        } catch (error) {
            console.log('Error while creating department: ', error);
        }
    }

    async function updateDepartment(departmentId: number, department: Department) {
        try {
            const response = await axios.put(url + `/${ departmentId }`, department);

            if (response.statusText === 'OK') {
                router.push("../departments");
            }
        } catch (error) {
            console.log('Error while updating department: ', error);
        }
    }

    // Handle form submit
    const onSubmit = (data: any) => {
        // Update department
        if (params['department-id'] !== 'create') {
            updateDepartment(params['department-id'], data as Department).then();
        }
        // Create department
        else {
            createDepartment(data as Department).then();
        }
    };

    return (
        <>
            <div className={ 'bg-slate-100 h-screen w-screen text-neutral-950 p-12 py-10' }>
                {/* HEADER */}
                <div className={ 'py-2 mb-7' }>
                    <a className={ 'text-3xl font-bold hover:text-blue-900' } href={ '../departments' }>
                        REST API: Departments - Employees
                    </a>
                </div>

                {/* DEPARTMENTS OPTIONS */}
                <div className={ 'flex min-h-[75px] items-center bg-slate-300 ' +
                    'mb-9 rounded-xl border-2 border-slate-200' }>
                    <h3 className={ 'ml-5 w-full text-xl font-bold' }>
                        { params['department-id'] !== 'create' ? 'Department Edition' : 'Department Creation' }
                    </h3>
                </div>

                {/* DEPARTMENT FORM */}
                <div>
                    <form className="max-w-md mx-auto p-4 border rounded shadow" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block mb-1">Name:</label>
                            <input
                                className="w-full py-2 px-3 border rounded"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <p className="text-red-500">Name is required</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Budget:</label>
                            <input
                                className="w-full py-2 px-3 border rounded"
                                {...register('budget', { required: true, pattern: /^\d+(\.\d{1,2})?$/ })}
                            />
                            {
                                errors.budget?.type === 'required' &&
                                <p className="text-red-500">Budget is required</p>
                            }
                            {errors.budget?.type === 'pattern' && (
                                <p className="text-red-500">Budget must be a valid number (up to 2 decimal places)</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Active:</label>
                            <input className="py-2 px-3" type="checkbox" {...register('active')} />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Location:</label>
                            <input
                                className="w-full py-2 px-3 border rounded"
                                {...register('location', { required: true })}
                            />
                            {errors.location && <p className="text-red-500">Location is required</p>}
                        </div>

                        {/* BUTTONS */}
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" type="submit">
                            Save
                        </button>

                        <a
                            href={ '../departments' }
                            className="inline-block ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Cancel
                        </a>
                    </form>
                </div>
            </div>
        </>
    )
}