import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const DataTable = ({
  headers,
  data,
  tableClassName,
  onEdit,
  onDelete,
  isEditable,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={tableClassName}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2">
                  {cell}
                </td>
              ))}
              {isEditable && (
                <td className="px-4 py-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="mr-2 text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
