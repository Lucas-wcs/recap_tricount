
import "./App.css";
import axios from "axios";
import {useLoaderData, useRevalidator} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

function App() {

    const voyages = useLoaderData()

    const ref = useRef()

    const revalidator = useRevalidator()

    const [libelle, setLibelle] = useState("")
    const [montant, setMontant] = useState(0)
    const [nom, setNom] = useState("")
    const [voyageurs, setVoyageurs] = useState([])
    const [selectedUser, setSelectedUser] = useState("")

    const fetchVoyageurs = () => {
        axios.get("http://localhost:5000/voyageur")
            .then((res) => {
                setVoyageurs(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchVoyageurs()
    }, [])

    const handleAdd = async () => {
        if(ref.current) {
            const nom = ref.current.value
            try {
                const res = await axios.post("http://localhost:5000/voyage", {nom})

                revalidator.revalidate()

            } catch(e) {
                alert("Insertion échouée")
            }
        }
    }

    const handleAddDepense = async (voyageId) => {
        try {
            if(selectedUser !== "") {
                const res = await axios.post("http://localhost:5000/depense", {voyageur_id: selectedUser, libelle, montant, voyage_id: voyageId})

                setLibelle("")
                setMontant("")
                setNom("")
                setSelectedUser("")
                revalidator.revalidate()
            } else {
                const res = await axios.post("http://localhost:5000/depense", {nom, libelle, montant, voyage_id: voyageId})

                setLibelle("")
                setMontant("")
                setNom("")
                setSelectedUser("")
                revalidator.revalidate()
                fetchVoyageurs()
            }
        } catch(e) {
            alert("Insertion échouée")
        }
    }

  return (
    <div className="App" style={{padding: "50px", display: "flex", gap: "20px"}}>
        {
            voyages.map((voyage) => {
                return <div key={voyage.id} style={{border: "1px black solid", padding: "5px", borderRadius: "5px", width: "fit-content", height: "fit-content"}}>
                    <p>{voyage.nom}</p>
                    <p>LISTE DES DEPENSES </p>
                    {
                        voyage.depense.map((d) => {
                            return <div key={d.id} style={{border: "1px black solid", padding: "5px", borderRadius: "5px", margin: "5px"}}>
                                <p>{d.libelle}</p>
                                <p>{d.montant} €</p>
                                <p>{d.voyageurNom}</p>
                            </div>
                        })
                    }
                    <div style={{border: "1px black solid", padding: "5px", borderRadius: "5px", width: "fit-content", height: "fit-content"}}>
                        <input type={"text"} placeholder={"libelle"} value={libelle} onInput={(e) => setLibelle(e.target.value)}/>
                        <input type={"number"} placeholder={"montant"} value={montant} onInput={(e) => setMontant(e.target.value)}/>
                        <input type={"text"} placeholder={"nom du voyageur"} value={nom} onInput={(e) => setNom(e.target.value)}/>
                        <select value={selectedUser} onInput={(e) => setSelectedUser(e.target.value)}>
                            <option value={""}>---</option>
                            {voyageurs.filter((voyageur) => {
                                return voyageur.voyage_id === voyage.id
                            })
                                .map((voyageur) => {
                                    return <option key={voyageur.id} value={voyageur.id}>{voyageur.nom}</option>
                                })
                            }
                        </select>
                        <button onClick={() => handleAddDepense(voyage.id)}>créer la dépense</button>
                    </div>
                    <div>
                        {
                            voyage.voyageurs.length > 0 && <div>
                                <p>Le voyageur a avoir le plus dépensé est : {voyage.voyageurs[0].voyageurNom}</p>
                                <p>Il/Elle a dépensé {voyage.voyageurs[0].total} €</p>
                                {
                                    voyage.voyageurs.length > 1 && <>
                                    {
                                        voyage.voyageurs.map((voyageur, index) => {
                                            if(index > 0) {
                                                return <div>
                                                    <p>Voyageur : {voyageur.voyageurNom} doit payer à {voyage.voyageurs[0].voyageurNom} le montant suivant : {voyage.voyageurs.length === 2 ? voyage.voyageurs[0].total/2 - voyageur.total / 2 : (voyage.voyageurs[0].total / (voyage.voyageurs.length - 1)) - voyageur.total/ (voyage.voyageurs.length - 1)} €</p>
                                                </div>
                                            }
                                        })
                                    }
                                    </>
                                }
                            </div>
                        }
                    </div>
                </div>
            })
        }
        <input ref={ref} type={"text"} name={"nom"} placeholder={"nom du voyage"} style={{border: "1px black solid", padding: "5px", borderRadius: "5px", width: "fit-content", height: "fit-content"}}/>
        <button onClick={handleAdd} style={{border: "1px black solid", padding: "5px", borderRadius: "5px", width: "fit-content", height: "fit-content"}}>+</button>
    </div>
  );
}

export const voyageLoader = async () => {
  try {

      const res = await axios.get("http://localhost:5000/voyage")

      return res.data

  } catch(e) {
      return []
  }

}

export default App;
