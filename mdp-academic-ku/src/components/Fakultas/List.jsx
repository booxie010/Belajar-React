// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react"
import axios from 'axios';
import { NavLink } from "react-router-dom";

export default function List() {
    const [fakultas, setFakultas] = useState([]);

    useEffect(() => {
        // https://project-apiif-3-b.vercel.app/api/api/fakultas
        axios
            .get("http://127.0.0.1:8000/api/fakultas")
            .then((response) => {
                setFakultas(response.data.result);
            })
            .catch((error) => {
                console.error("Error feteching data: ", error);
            });
    }, []);
   
    return (
        <>
            <h2>List Fakultas</h2>

            {/* Tombol Tambah Fakultas */}
            <NavLink to="/fakultas/create" className="btn btn-primary my-4">
                Create
            </NavLink>

            {/* Daftar fakultas */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nomor</th>
                        <th>Fakultas</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fakultas.map((fk, index) => (
                        <tr key={fk.id}>
                            <td>{index+1}</td>
                            <td>{fk.nama}</td>
                            <td>
                                <NavLink to={`/fakultas/edit/${fk.id}`} className="btn btn-warning">
                                    Edit
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}