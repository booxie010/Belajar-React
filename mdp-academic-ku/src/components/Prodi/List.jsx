import React, {useEffect, useState} from "react"
import axios from "axios";
import { NavLink } from "react-router-dom";

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
                    </tr>
                </thead>
                <tbody>
                    {prodi.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center">Tidak Ada Data Prodi</td>
                        </tr>
                    ) : (
                        prodi.map((pd, index) => (
                            <tr key={pd.id}>
                                <td>{index + 1}</td>
                                <td>{pd.nama}</td>
                                <td>{pd.fakultas.nama}</td>
                                <td>
                                    <NavLink to={`/prodi/edit/${pd.id}`} className="btn btn-warning">
                                        Edit
                                    </NavLink>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}