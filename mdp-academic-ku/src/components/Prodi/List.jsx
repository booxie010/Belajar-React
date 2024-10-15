import React, {useEffect, useState} from "react"
import axios from "axios";

export default function List() {
    const [prodi, setProdi] = useState([]);
    const [namaProdi, setNamaProdi] = useState("");
    const [selectedFakultas, setSelectedFakultas] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [duplicate, setDuplicate] = useState(false);

    useEffect(() => {
        getProdis()
    }, []);

    const getProdis = () => {
        axios
            .get("http://127.0.0.1:8000/api/prodi")
            .then((response) => {
                setProdi(response.data.result)
                console.log(response.data.result)
            })
            .catch((error) => {
                console.error("Error feteching data: ", error);
            })
    }

    const submitProdi = () => {
        
    }

    return(
        <>
            <h2>Program Studi List</h2>

            <div className="my-4">
                <button type="button" className="btn btn-primary"
                    data-bs-toggle="modal" data-bs-target="#formAddProdi"
                >
                    Tambah Prodi
                </button>
            </div>

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
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="modal fade" id="formAddProdi" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}aria-labelledby="formAddProdiLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Form Fakultas</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label className="form-label">Nama Prodi</label>
                                <input 
                                    className="form-control"
                                    placeholder="Masukan Program Studi"
                                    value={namaProdi}
                                    onChange={(e) => setNamaProdi(e.target.value)}
                                />
                                <label className="form-label mt-3">Masukan Fakultas</label>
                                <select className="form-select" aria-label="Pilih Fakultas"
                                
                                >
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-Primary" onClick={submitProdi} data-bs-dismiss="modal">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}