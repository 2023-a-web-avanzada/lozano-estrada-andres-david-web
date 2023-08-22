'use client'

import { useEffect, useState } from "react";
import axios from 'axios';
import { Department } from "@/types/department";

const url = 'http://localhost:3030'

export default function Page() {
    const [ departments, setDepartments ] = useState([]);

    useEffect(() => {
        async function getDepartments() {
            const response = await axios.get(url + '/departments')
            console.log(response);
            setDepartments(response.data);
        }

        async function createDepartment() {
            try {
                const response = await axios.post(url + '/departments/create', {});
                console.log(response)
            } catch (error) {
                console.log('Error: ' + error);
            }
        }

        createDepartment().then(() => {
            getDepartments().then(r => console.log(r)).catch(e => console.log(e));
        });
    }, []);

    return (
        <>

        </>
    )
}