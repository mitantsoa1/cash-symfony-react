import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import FormTransaction from "./FormTransaction";
import Loading from "../../components/Loading";
import Entete from "../../components/Entete";
import DataTable from "../../components/DataTable";

const Transaction = () => {
  // Fetching data using SWR
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR(
    "/api/transaction",
    fetcher
  );

  const headers = [
    "ID",
    "Opérateur",
    "Type",
    "Montant",
    "N° Tél",
    "Réf",
    "Date",
  ];

  const [formData, setFormData] = useState({
    operateur: "airtel",
    montant: "",
    type: "retrait",
    tel: "",
    reference: "",
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
      .post("/api/transaction/create", formData)
      .then((response) => {
        // Re-fetch the data after successful submission

        setFormData({
          operateur: "airtel",
          montant: "",
          type: "retrait",
          tel: "",
          reference: "",
        });
        mutate();
      })
      .catch((error) => {
        console.error("Erreur lors de la soumission:", error);
      });
  };

  if (error) console.log(error);
  return (
    <div className="flex flex-col h-screen">
      <Entete>Transaction</Entete>

      <div className="flex-grow p-4 overflow-y-auto h-1/3">
        <FormTransaction
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <hr />
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

export default Transaction;
