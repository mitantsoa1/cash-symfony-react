import React from "react";

const FormCompte = ({ formData, handleChange, handleSubmit, isEditing }) => {
  return (
    <form className="md:w-1/3 lg:w-1/3 sm:w-full" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-700">
          Operateur
        </label>
        <div className="relative">
          <select
            value={formData.operateur}
            onChange={handleChange}
            name="operateur"
            id="operateur"
            className="w-full py-2 pl-2 pr-10 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="airtel">Airtel</option>
            <option value="orange">Orange</option>
            <option value="telma">Telma</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-700">
          Depot(solde)
        </label>
        <div className="relative">
          <input
            required
            type="text"
            placeholder=""
            name="solde"
            id="solde"
            value={formData.solde}
            onChange={handleChange}
            className="w-full py-2 pl-2 pr-10 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-700">
          Observation
        </label>
        <div className="relative">
          <textarea
            name="observation"
            id="observation"
            value={formData.observation}
            onChange={handleChange}
            className="w-full py-2 pl-2 pr-10 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
      <div className="mb-5">
        <input
          type="submit"
          value={isEditing ? "Modifier" : "Inserer"}
          className="w-full py-2 font-medium text-white transition bg-blue-600 border rounded-md cursor-pointer hover:bg-blue-700"
        />
      </div>
    </form>
  );
};

export default FormCompte;
