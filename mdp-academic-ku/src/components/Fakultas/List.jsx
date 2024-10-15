// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react"
import axios from 'axios';

export default function List() {
    const [fakultas, setFakultas] = useState([]);
    const [namaFakultas, setNamaFakultas] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [duplicate, setDuplicate] = useState(false);

    useEffect(() => {
        getFakultas()
    }, []);

    const getFakultas = () => {
        axios
            .get("http://127.0.0.1:8000/api/fakultas")
            .then((response) => {
                setFakultas(response.data.result);
            })
            .catch((error) => {
                console.error("Error feteching data: ", error);
            });
    }
    const submitFakultas = () => {
        const data = {
            nama: namaFakultas
        };

        // Check apakah data bisa masuk
        console.log(data);

        axios
            .post("http://127.0.0.1:8000/api/fakultas", data)
            .then((response) => {
                if(response.data.success) {
                    setSuccess(true);
                    getFakultas();
                } else if (response.data.duplicate) {
                    console.log("Duplikasi");
                    setDuplicate(true);
                }
            })
            .catch((error) => {
                setError(true);
                console.error("Error feteching data: ", error);
            });

        setNamaFakultas("");

        // Timer alert selama 3 detik
        setTimeout(() => {
            setSuccess(false);
            setError(false);
            setDuplicate(false);
        }, 5000);
    }
    
    return (
        <>
            <h2>List Fakultas</h2>

            {/* Tombol Modals Tambah Fakultas */}
            <div className="my-4">
                <button type="button" className="btn btn-primary"
                    data-bs-toggle="modal" data-bs-target="#formAddFakultas"
                >
                    Tambah Fakultas
                </button>
            </div>
            
            {/* Alert Messages */}
            {success && (
                <div className="alert alert-success" role="alert">
                    Data Fakultas Berhasil
                </div>
            )}
            
            {duplicate && (
                <div className="alert alert-warning" role="alert">
                    Maaf Data Fakultas Sudah Ada!!
                </div>
            )}
            
            {error && (
                <div className="alert alert-danger !!" role="alert">
                    Terjadi Kesalahan Pastikan Input Fakultas Diisi !!
                </div>
            )}

            {/* Daftar fakultas */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nomor</th>
                        <th>Fakultas</th>
                    </tr>
                </thead>
                <tbody>
                    {fakultas.map((fk, index) => (
                        <tr key={fk.id}>
                            <td>{index+1}</td>
                            <td>{fk.nama}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modals */}
            <div className="modal fade" id="formAddFakultas" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}aria-labelledby="formAddFakultasLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Form Fakultas</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label className="form-label">Nama Fakultas</label>
                                <input 
                                    className="form-control"
                                    placeholder="Masukan Fakultas"
                                    value={namaFakultas}
                                    onChange={(e) => setNamaFakultas(e.target.value)}
                                />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-Primary" onClick={submitFakultas} data-bs-dismiss="modal">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}