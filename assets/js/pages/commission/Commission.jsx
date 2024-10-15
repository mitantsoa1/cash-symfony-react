import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import FormCommission from "./FormCommission";
import Loading from "../../components/Loading";
import Entete from "../../components/Entete";
import DataTable from "../../components/DataTable";

const Commission = () => {
  // Fetching data using SWR
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR("/api/commission", fetcher);

  const headers = [
    "ID",
    "Opérateur",
    // "Type",
    "Montant Min.",
    "Montant max",
    "Retrait",
    "Depot",
  ];

  const [formData, setFormData] = useState({
    operateur: "airtel",
    // type: "retrait",
    min: "",
    max: "",
    retrait: "",
    depot: "",
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
      .post("/api/commission/create", formData)
      .then((response) => {
        // Re-fetch the data after successful submission
        mutate(); // This re-fetches the data from the API and updates the component
        setFormData({
          operateur: "airtel",
          // type: "retrait",
          min: "",
          max: "",
          retrait: "",
          depot: "",
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la soumission:", error);
      });
  };

  if (error) console.log(error);
  return (
    <div className="flex flex-col h-screen">
      <Entete>Commission</Entete>

      <div className="flex-grow p-4 overflow-y-auto h-1/3">
        <FormCommission
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : !error ? (
        <div className="flex-grow p-4 overflow-y-auto h-1/3">
          <DataTable
            headers={headers}
            data={data}
            tableClassName="min-w-full bg-gray-50 border border-gray-400"
          />
        </div>
      ) : (
        <div>Échec du chargement</div>
      )}
    </div>
  );
};

export default Commission;
