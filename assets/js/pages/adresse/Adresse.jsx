import React, { useState } from "react";
import Entete from "../../components/Entete";
import FormAdresse from "./FormAdresse";
import useSWR from "swr";
import Loading from "../../components/Loading";
import DataTable from "../../components/DataTable";
import axios from "axios";

const Adresse = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR("/api/adresse", fetcher);
  const headers = ["ID", "Adresse", "Lieu"];

  const [formData, setFormData] = useState({
    adress: "",
    lieu: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission par défaut

    axios
      .post("/api/adresse/create", formData)
      .then((response) => {
        // Re-fetch the data after successful submission
        mutate(); // This re-fetches the data from the API and updates the component
        setFormData({
          adress: "",
          lieu: "",
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la soumission:", error);
      });
  };

  if (error) return <div>Échec du chargement</div>;

  return (
    <div className="flex flex-col h-screen">
      <Entete>Adresse</Entete>
      <div className="flex-grow h-1/3 p-4 overflow-y-auto">
        <FormAdresse
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex-grow p-4 h-1/3 overflow-y-auto">
          <DataTable
            headers={headers}
            data={data}
            tableClassName="min-w-full bg-gray-50 border border-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default Adresse;
