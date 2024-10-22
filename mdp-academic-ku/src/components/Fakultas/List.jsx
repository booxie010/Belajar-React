// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react"
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
    const [fakultas, setFakultas] = useState([]);

    useEffect(() => {
        // https://project-apiif-3-b.vercel.app/api/api/fakultas
        axios
            .get("https://laravel-apiif-3-b-main.vercel.app/api/api/fakultas")
            .then((response) => {
                setFakultas(response.data.result);
            })
            .catch((error) => {
                console.error("Error feteching data: ", error);
            });
    }, []);
   
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Are You Sure?",
            text: `You won't be able to revent this Fakultas: ${nama}`,
            icon: "warning",
            showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if(result.isConfirmed) {
                axios
                    .delete(`https://laravel-apiif-3-b-main.vercel.app/api/api/fakultas/${id}`)
                    .then((response) => {
                        setFakultas(fakultas.filter((f) => f.id !== id));

                        // Tampilkan notifikasi sukses
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                    })
                    .catch((error) => {
                        console.error("Error deleting data: ", error);
                        Swal.fire(
                            "Error",
                            "There was an issue deleting the data",
                            "error"
                        );
                    });
            }
        })
    }
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
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fakultas.map((fk, index) => (
                        <tr key={fk.id}>
                            <td>{index+1}</td>
                            <td>{fk.nama}</td>
                            <td className="text-center">
                                <NavLink to={`/fakultas/edit/${fk.id}`} className="btn btn-warning m-1">
                                    Edit
                                </NavLink>
                                <button className="btn btn-danger m-1" onClick={() => handleDelete(fk.id, fk.nama)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}