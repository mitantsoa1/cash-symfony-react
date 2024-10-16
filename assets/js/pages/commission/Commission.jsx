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

  const [isEditing, setIsEditing] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche la soumission par défaut

    try {
      if (isEditing) {
        await axios.post(`/api/commission/edit/${formData.id}`, formData);
      } else {
        await axios.post("/api/commission/create", formData);
      }
      mutate();
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    }
  };

  const handleEdit = (row) => {
    setFormData({
      id: row.id,
      operateur: row.operateur,
      min: row.min,
      max: row.max,
      retrait: row.retrait,
      depot: row.depot,
    });
    setIsEditing(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        await axios.delete(`/api/commission/${row.id}`);
        mutate();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      operateur: "",
      min: "",
      max: "",
      retrait: "",
      depot: "",
    });
    setIsEditing(false);
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
          isEditing={isEditing}
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            isEditable={true}
          />
        </div>
      ) : (
        <div>Échec du chargement</div>
      )}
    </div>
  );
};

export default Commission;
