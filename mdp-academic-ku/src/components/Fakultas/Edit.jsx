import React, {useEffect, useState} from "react"
import axios from 'axios';
import { NavLink } from "react-router-dom";
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
            .get(`http://127.0.0.1:8000/api/fakultas/${id}`)
            .then((response) => {
                setNama(response.data.result.nama);
                console.log(response.data.result);
            })
            .catch((error) => {
                console.error("Error feteching data: ", error);
                setError("Data tidak ditemukan");
            });
    }, [id]);

    return (
        <div>
            <h1>oke</h1>
        </div>
    )
} 