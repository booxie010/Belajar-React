import React, {useEffect, useState} from "react"
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";


export default function List() {
    const [prodi, setProdi] = useState([]);

    useEffect(() => {
        getProdis();

    }, []);

    const getProdis = () => {
        axios
            .get("https://laravel-apiif-3-b-main.vercel.app/api/api/prodi")
            .then((response) => {
                setProdi(response.data.result)
                // console.log(response.data.result)
            })
            .catch((error) => {
                console.error("Error feteching data: ", error);
            });
    }
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Are You Sure?",
            text: `You won't be able to revent this prodi: ${nama}`,
            icon: "warning",
            showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if(result.isConfirmed) {
                axios
                    .delete(`https://laravel-apiif-3-b-main.vercel.app/api/api/prodi/${id}`)
                    .then((response) => {
                        setProdi(prodi.filter((f) => f.id !== id));

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
    return(
        <>
            <h2>Program Studi List</h2>

            {/* Tombol Tambah Prodi */}
            <NavLink to="/prodi/create" className="btn btn-primary my-4">
                Create
            </NavLink>

            {/* Daftar fakultas */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nomor</th>
                        <th>Program Studi</th>
                        <th>Fakultas</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {prodi.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">Tidak Ada Data Prodi</td>
                        </tr>
                    ) : (
                        prodi.map((pd, index) => (
                            <tr key={pd.id}>
                                <td>{index + 1}</td>
                                <td>{pd.nama}</td>
                                <td>{pd.fakultas.nama}</td>
                                <td className="text-center">
                                    <NavLink to={`/prodi/edit/${pd.id}`} className="btn btn-warning m-1">
                                        Edit
                                    </NavLink>
                                    <button className="btn btn-danger m-1" onClick={() => handleDelete(pd.id, pd.nama)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}