import React from "react";

const FormAdresse = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form
      className="md:w-1/3 lg:w-1/3 sm:w-full "
      action="/api/adresse/create"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-400 dark:text-white">
          Adresse
        </label>
        <div className="relative">
          <input
            required
            type="text"
            placeholder=""
            name="adress"
            id="adress"
            value={formData.adress}
            onChange={handleChange}
            className="w-full py-2 pl-2 pr-10 bg-white border rounded-md outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-gray-400 dark:text-white">
          Lieu
        </label>
        <div className="relative">
          <input
            name="lieu"
            id="lieu"
            value={formData.lieu}
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

export default FormAdresse;
