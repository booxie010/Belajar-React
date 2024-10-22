import {useState} from "react";
import axios from "axios";

export default function CreateFakultas() {
    // Inisialisasi state untuk menympan nama fakultas
    const [namaFakultas, setNamaFakultas] = useState("");
    // Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");
    // Inisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");
    
    // Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validasi input jika namaFakultas kosong, set pesan error
        if (namaFakultas.trim() === "") {
            setError("Nama Fakultas is required"); // set pesan error jika input field kosong
            return; // Stop eksekusi
        }

        try {
            const response = await axios.post(
                "https://laravel-apiif-3-b-main.vercel.app/api/api/fakultas",
                {
                    nama: namaFakultas, // Data yang dikirim berupa objek JSON
                }
            );

            if (response.status === 201) {
                // Tampilkan pesan sukses jika fakultas berhasil dibuat
                setSuccess("Fakultas created successfully");
                setNamaFakultas("");
            } else {
                // Jika tidak berhasil, maka pesan error nampil
                setError("Failed to create fakultas");
            }
        } catch (error) {
            // JIka terjadi error (misal masalah jaringan dan database), tampilkan pesan error
            setError("An error occurred while creating fakultas")
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Fakultas</h2>
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}
            
            {/* Form untuk mengisi nama fakultas */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaFakultas" className="form-label">
                        Nama Fakultas
                    </label>

                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="namaFakultas"
                        value={namaFakultas} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setNamaFakultas(e.target.value)} // Update State saat input berubah
                        placeholder="Masukan Nama Fakultas" // Placeholder teks untuk input
                    />
                </div>
                {/* Type Button Submit */}
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}