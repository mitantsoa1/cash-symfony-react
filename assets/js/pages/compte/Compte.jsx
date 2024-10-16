import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import FormCompte from "./FormCompte";
import Loading from "../../components/Loading";
import Entete from "../../components/Entete";
import DataTable from "../../components/DataTable";

const Compte = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading, mutate } = useSWR("/api/compte", fetcher);

  const headers = [
    "ID",
    "Opérateur",
    "Solde",
    "Observation",
    "Transaction",
    "Actions",
  ];

  const [formData, setFormData] = useState({
    id: 0,
    operateur: "airtel",
    solde: "",
    observation: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.post(`/api/compte/edit/${formData.id}`, formData);
      } else {
        await axios.post("/api/compte/create", formData);
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
      solde: row.solde,
      observation: row.observation,
    });
    setIsEditing(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        await axios.delete(`/api/compte/${row.id}`);
        mutate();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      operateur: "airtel",
      solde: "",
      observation: "",
    });
    setIsEditing(false);
  };

  if (error) console.log(error);

  return (
    <div className="flex flex-col h-screen">
      <Entete>Compte</Entete>

      <div className="flex-grow p-4 overflow-y-auto h-1/3">
        <FormCompte
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : !error ? (
        <div className="flex-grow p-4 overflow-y-auto h-2/3">
          <DataTable
            headers={headers}
            data={data || []}
            tableClassName="min-w-full bg-gray-50 border border-gray-300"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <div className="text-red-600">Échec du chargement</div>
      )}
    </div>
  );
};

export default Compte;
