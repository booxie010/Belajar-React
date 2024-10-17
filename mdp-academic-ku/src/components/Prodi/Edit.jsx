import React, {useState} from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditProdi() {
    const {id} = useParams(); // Ambil parameter id dari url menggunakan use params
    const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
    const [nama, setNama] = useState("");
    const [fakultas, setFakultas] = useState("");
    const [listFakultas, setListFakultas] = useState([]);
    const [error, setError] = useState(null);

    // Mengambil data fakultas berdasarkan id ketika komponen pertama kali dimuat

    useEffect(() => {
        axios
            .get(`https://laravel-apiif-3-b-main.vercel.app/api/api/prodi/${id}`)
            .then((response) => {
                setNama(response.data.result.nama);
                setFakultas(response.data.result.fakultas.id)
                console.log(response.data.result.nama);
            })
            .catch((error) => {
                console.error("Error feteching data: ", error);
                setError("Data tidak ditemukan");
            });
        axios
            .get("https://laravel-apiif-3-b-main.vercel.app/api/api/fakultas")
            .then((response) => {
                setListFakultas(response.data.result);
            })
            .catch((error) => {
                console.error("Error feteching data: ", error);
            });
    }, [id]);

    // Menghandle perubahan input saat pengguna mengetik nilai di form
    const handleChange = (e) => {
        setNama(e.target.value); // Mengubah state 'nama' sesuai nilai input yang diisi pengguna
    };

    const handleFakultasChange = (e) => {
        setFakultas(e.target.value); // Mengubah state 'nama' sesuai nilai input yang diisi pengguna
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah reload halaman saat form disubmit
        axios
            .patch(`https://laravel-apiif-3-b-main.vercel.app/api/api/prodi/${id}`, {
                nama,
                fakultas_id: fakultas,
            })
            .then((response) => {
                navigate("/prodi"); // Jika berhasil, navigasi kembali ke halaman list fakultas
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                setError("Gagal mengupdate data")
            });
    }
    return(
        <div className="container mt-5">
            <h2 className="mb-4">Edit Prodi</h2>
            { error &&  <p className="text-danger">{error}</p>}
            {/* Form untuk mengisi nama Prodi */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProdi" className="form-label">
                        Nama Prodi
                    </label>

                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text"
                        className="form-control"
                        id="nama"
                        value={nama} // Nilai input disimpan di state namaFakultas
                        onChange={handleChange} // Update State saat input berubah
                        // Placeholder teks untuk input
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fakultas" className="form-label">
                        Fakultas
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <select
                        className="form-select" id="fakultas"
                        value={fakultas}
                        onChange={handleFakultasChange}
                    >
                        <option value="">Select Fakultas</option>

                        {listFakultas.map((fakultas) => (
                            <option key={fakultas.id} value={fakultas.id}>
                                {fakultas.nama}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Type Button Submit */}
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    )
}