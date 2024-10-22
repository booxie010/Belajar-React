import React, {useState} from "react";
import axios from "axios";
import { useEffect } from "react";

export default function CreateProdi() {
    // Inisialisasi state untuk menympan nama prodi
    const [namaProdi, setNamaProdi] = useState("");
    // Inisialisasi state untuk menyimpan id fakultas yang dipilih
    const [fakultasId, setFakultasId] = useState("");
    // Inisialisasi state untuk menyimpan id fakultas yang dipilih
    const [fakultasList, setFakultasList] = useState([]);
    // Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");
    // Inisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");

    // Mengambil daftar fakultas dari API saat komponen select dimuat

    useEffect(() => {
        const fetchFakultas = async () => {
            try {
                const response = await axios.get(
                    "https://laravel-apiif-3-b-main.vercel.app/api/api/fakultas"
                );
                setFakultasList(response.data.result);
            } catch (error) {
                setError("Failed to fetch fakultas data");
            }
        };
        fetchFakultas();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validasi input: jika namaProdi atau fakultasId kosong, set pesan error
        if (namaProdi.trim() === "" || fakultasId.trim() === "" ) {
            setError("Nama Prodi and Fakultas required");
            return;
        }

        try {
            const response = await axios.post(
                "https://laravel-apiif-3-b-main.vercel.app/api/api/prodi",
                {
                    // Data yang dikirim berupa objek JSON
                    nama: namaProdi, // Nama Prodi
                    fakultas_id: fakultasId, // Data ID Fakultas yang dipilih
                }
            );

            if (response.status === 201) {
                // Tampilkan pesan sukses jika fakultas berhasil dibuat
                setSuccess("Prodi created successfully");
                setNamaProdi("");
                setFakultasId(""); // Reset fakultas selection
            } else {
                // Jika tidak berhasil, maka pesan error nampil
                setError("Failed to create Prodi");
            }
        } catch (error) {
            // JIka terjadi error (misal masalah jaringan dan database), tampilkan pesan error
            setError("An error occurred while creating Prodi");
            console.error(error);
        }
    }
    return(
        <div className="container mt-5">
            <h2 className="mb-4">Create Prodi</h2>
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}
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
                        id="namaProdi"
                        value={namaProdi} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setNamaProdi(e.target.value)} // Update State saat input berubah
                        placeholder="Masukan Nama Prodi" // Placeholder teks untuk input
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fakultasId" className="form-label">
                        Fakultas
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <select
                        className="form-select" id="fakultasId"
                        value={fakultasId}
                        onChange={(e) => setFakultasId(e.target.value)}
                    >
                        <option value="">Select Fakultas</option>

                        {fakultasList.map((fakultas) => (
                            <option key={fakultas.id} value={fakultas.id}>
                                {fakultas.nama}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Type Button Submit */}
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    )
}