import React from "react";

const DataTable = ({ headers, data, tableClassName }) => {
  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="border px-4 py-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="text-center">
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="border px-4 py-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
