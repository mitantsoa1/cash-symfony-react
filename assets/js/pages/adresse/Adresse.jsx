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
  const headers = ["ID", "Adresse", "Lieu", "Actions"];
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche la soumission par défaut

    try {
      if (isEditing) {
        await axios.post(`/api/adresse/edit/${formData.id}`, formData);
      } else {
        await axios.post("/api/adresse/create", formData);
      }
      mutate();
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    }
  };

  const handleEdit = (row) => {
    console.log(row);

    setFormData({
      id: row.id,
      adress: row.adresse,
      lieu: row.lieu,
    });
    setIsEditing(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        await axios.delete(`/api/adresse/remove/${row.id}`);
        mutate();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      adress: "",
      lieu: "",
    });
    setIsEditing(false);
  };

  if (error) return <div>Échec du chargement</div>;

  return (
    <div className="flex flex-col h-screen">
      <Entete>Adresse</Entete>
      <div className="flex-grow p-4 overflow-y-auto h-1/3">
        <FormAdresse
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
};

export default Adresse;
