import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import Loading from "../../components/Loading";
import Entete from "../../components/Entete";
import DataTable from "../../components/DataTable";

const Gain = () => {
  // Fetching data using SWR
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR("/api/gain", fetcher);

  const headers = ["ID", "Opérateur", "Type", "Montant"];

  if (error) console.log(error);
  return (
    <div className="flex flex-col h-screen">
      <Entete>Gain</Entete>

      {/* <div className="flex-grow p-4 overflow-y-auto h-1/3">
        <FormGain
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div> */}

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

export default Gain;
