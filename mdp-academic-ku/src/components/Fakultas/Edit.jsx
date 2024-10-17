import React, {useEffect, useState} from "react"
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Edit() {
    const {id} = useParams(); // Ambil parameter id dari url menggunakan use params
    const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
    const [nama, setNama] = useState("");
    const [error, setError] = useState(null);

    // Mengambil data fakultas berdasarkan id ketika komponen pertama kali dimuat 

    useEffect(() => {
        axios
            .get(`https://laravel-apiif-3-b-main.vercel.app/api/api/fakultas/${id}`)
            .then((response) => {
                setNama(response.data.result.nama);
                // console.log(response.data.result.nama);
            })
            .catch((error) => {
                console.error("Error feteching data: ", error);
                setError("Data tidak ditemukan");
            });
    }, [id]);

    // Menghandle perubahan input saat pengguna mengetik nilai di form
    const handleChange = (e) => {
        setNama(e.target.value); // Mengubah state 'nama' sesuai nilai input yang diisi pengguna
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah reload halaman saat form disubmit
        axios
            .patch(`https://laravel-apiif-3-b-main.vercel.app/api/api/fakultas/${id}`, { nama })
            .then((response) => {
                navigate("/fakultas"); // Jika berhasil, navigasi kembali ke halaman list fakultas
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                setError("Gagal mengupdate data")
            });
    }
    return (
        <div>
            <h2>Edit Fakultas</h2>
            { error &&  <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nama" className="form-label">Nama Fakultas</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nama"
                        value={nama} // Mengisi nilai input dengan state 'nama'
                        onChange={handleChange} // Mengubah nilai input saat ada perubahan (user mengetik)
                        required // Input wajib diisi
                    />
                    <button type="submit" className="btn btn-primary mt-3">Save</button>
                </div>
            </form>
        </div>
    )
} 