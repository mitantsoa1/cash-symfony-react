import React from "react";

const FormCompte = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form
      className="md:w-1/3 lg:w-1/3 sm:w-full "
      action="/api/compte/create"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-400 dark:text-white">
          Operateur
        </label>
        <div className="relative">
          <select
            value={formData.operateur}
            onChange={handleChange}
            name="operateur"
            id="operateur"
            className="w-full py-2 pl-2 pr-10 bg-white border rounded-md outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="airtel">Airtel</option>
            <option value="orange">Orange</option>
            <option value="telma">Telma</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-400 dark:text-white">
          Type
        </label>
        <div className="relative">
          <select
            value={formData.type}
            onChange={handleChange}
            name="type"
            id="type"
            className="w-full py-2 pl-2 pr-10 bg-white border rounded-md outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="retrait">Retrait</option>
            <option value="depot">Depot</option>
            <option value="transfert">Transfert</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-400 dark:text-white">
          Montant
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
            className="w-full py-2 pl-2 pr-10 bg-white border rounded-md outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-400 dark:text-white">
          N° Tel
        </label>
        <div className="relative">
          <input
            required
            type="text"
            placeholder=""
            name="tel"
            id="tel"
            value={formData.tel}
            onChange={handleChange}
            className="w-full py-2 pl-2 pr-10 bg-white border rounded-md outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-400 dark:text-white">
          Reference
        </label>
        <div className="relative">
          <input
            required
            type="text"
            placeholder=""
            name="reference"
            id="reference"
            value={formData.reference}
            onChange={handleChange}
            className="w-full py-2 pl-2 pr-10 bg-white border rounded-md outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>
      <div className="mb-5">
        <input
          type="submit"
          value="Inserer"
          className="w-full py-2 font-medium text-white transition border rounded-md cursor-pointer bg-primary hover:bg-opacity-90"
        />
      </div>
    </form>
  );
};

export default FormCompte;
