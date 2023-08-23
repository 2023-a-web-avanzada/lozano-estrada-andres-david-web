'use client'

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import axios from 'axios';
import { Employee } from "@/types/employee";
import { Department } from "@/types/department";

const employeesURL = 'http://localhost:3030/employees';
const departmentsURL = 'http://localhost:3030/departments';

export default function Page(
    { params }: { params: { 'department-id': number, 'employee-id': number | 'create' } }
) {
    const [ departments, setDepartments ] = useState([] as Department[]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const router = useRouter();

    useEffect(() => {
        getAllDepartments().then();

        if (params['employee-id'] !== 'create') {
            getOneEmployeeById(params['employee-id']).then();
        }
    }, []);

    useEffect(() => {
        setValue('department', params['department-id']);
    }, [departments]);

    // Get all departments
    async function getAllDepartments() {
        const response = await axios.get(departmentsURL)

        if (response.statusText === 'OK') {
            setDepartments(response.data);
        }
    }

    // Get one department by id
    async function getOneEmployeeById(employeeId: number) {
        try {
            const response = await axios.get(employeesURL + `/${employeeId}`)

            if (response.statusText === 'OK') {
                // Fill form inputs
                if (response.data) {
                    for (const key in response.data) {
                        if (response.data.hasOwnProperty(key)) {
                            if (key === 'birthday') {
                                const birthdayDate = new Date(response.data[key]);
                                setValue(key, birthdayDate.toISOString().split('T')[0]);
                            } else {
                                setValue(key, response.data[key]);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error while fetching employee:', error);
        }
    }

    async function createEmployee(employee: Employee) {
        try {
            const response = await axios.post(employeesURL + '/create', employee);

            if (response.statusText === 'Created') {
                router.push("../employees");
            }
        } catch (error) {
            console.log('Error while creating employee:', error);
        }
    }

    async function updateEmployee(employeeId: number, employee: Employee) {
        try {
            const response = await axios.put(employeesURL + `/${ employeeId }`, employee);

            if (response.statusText === 'OK') {
                router.push("../employees");
            }
        } catch (error) {
            console.log('Error while updating employee:', error);
        }
    }

    // Handle form submit
    const onSubmit = (data: any) => {
        // Update employee
        if (params['employee-id'] !== 'create') {
            updateEmployee(params['employee-id'], data as Employee).then();
        }
        // Create employee
        else {
            createEmployee(data as Employee).then();
        }
    };

    return (
        <>
            <div className="bg-slate-100 h-screen w-screen text-neutral-950 p-12 py-10">
                {/* HEADER */}
                <div className="py-2 mb-7">
                    <a className="text-3xl font-bold hover:text-blue-900" href="../../../departments">
                        REST API: Departments - Employees
                    </a>
                </div>

                {/* EMPLOYEE OPTIONS */}
                <div className="flex min-h-[75px] items-center bg-slate-300 mb-9 rounded-xl border-2 border-slate-200">
                    <h3 className="ml-5 w-full text-xl font-bold">
                        { params['employee-id'] !== 'create' ? 'Employee Edition' : 'Employee Creation' }
                    </h3>
                </div>

                {/* EMPLOYEE FORM */}
                <div>
                    <form className="max-w-md mx-auto p-4 border rounded shadow" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block mb-1">Name:</label>
                                <input
                                    className="w-full py-2 px-3 border rounded"
                                    {...register('name', { required: true })}
                                />
                                {errors.name && <p className="text-red-500">Name is required</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Birthday:</label>
                                <input
                                    className="w-full py-2 px-3 border rounded"
                                    type="date"
                                    {...register('birthday', { required: true })}
                                />
                                {errors.birthday && <p className="text-red-500">Birthday is required</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Salary:</label>
                                <input
                                    className="w-full py-2 px-3 border rounded"
                                    {...register('salary', { required: true, pattern: /^\d+(\.\d{1,2})?$/ })}
                                />
                                {errors.salary?.type === 'required' && (
                                    <p className="text-red-500">Salary is required</p>
                                )}
                                {errors.salary?.type === 'pattern' && (
                                    <p className="text-red-500">
                                        Salary must be a valid number (up to 2 decimal places)
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Position:</label>
                                <input
                                    className="w-full py-2 px-3 border rounded"
                                    {...register('position', { required: true })}
                                />
                                {errors.position && <p className="text-red-500">Position is required</p>}
                            </div>

                            <div className="flex items-center mb-4">
                                <label className="mb-1 mr-4">Insured:</label>
                                <input className="py-2 px-3" type="checkbox" {...register('insured')} />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1">Department:</label>
                                <select
                                    className="w-full py-2 px-3 border rounded"
                                    {...register('department', { required: true })}
                                >
                                    <option value="">Select a department</option>
                                    {departments.map(department => (
                                        <option key={ department.id } value={ department.id }>
                                            { department.name + ` (ID: ${department.id})` }
                                        </option>
                                    ))}
                                </select>
                                {errors.department && <p className="text-red-500">Department is required</p>}
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex mt-4">
                            <button
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                type="submit"
                            >
                                Save
                            </button>

                            <a
                                href="../employees"
                                className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}