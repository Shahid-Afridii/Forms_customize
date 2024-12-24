'use client';

import { useState } from 'react';
import Modal from './Modal';
import { FiChevronDown, FiCircle, FiCheck } from 'react-icons/fi';

const FieldBuilder = () => {
  const [records, setRecords] = useState([]); // Stores all form records
  const [showModal, setShowModal] = useState(false);

  const addRecord = (fields, gridColumns) => {
    setRecords([...records, { fields, gridColumns }]); // Add a new record with fields and grid layout
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Dynamic Form Builder</h1>
          <p className="text-gray-600 mt-3 text-lg">
            Add and customize form fields dynamically with ease
          </p>
        </div>

        {/* Add Fields Button */}
        <div className="mb-10 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gray-700 text-white font-medium text-lg rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
          >
            Add Fields
          </button>
        </div>

        {/* Modal */}
        {showModal && <Modal onClose={() => setShowModal(false)} onSave={addRecord} />}

        {/* Records Section */}
        <div className="space-y-12">
          {records.map((record, recordIndex) => (
            <div
              key={recordIndex}
              className={`grid grid-cols-1 sm:grid-cols-${record.gridColumns} gap-y-8 gap-x-6`}
              style={{
                gridTemplateColumns: `repeat(${record.gridColumns}, minmax(0, 1fr))`,
              }}
            >
              {record.fields.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                  <label
                    htmlFor={`field-${recordIndex}-${fieldIndex}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {field.title || 'Unnamed Field'}
                  </label>
                  {field.type === 'input' && (
                    <input
                      id={`field-${recordIndex}-${fieldIndex}`}
                      type={field.config.inputType || 'text'}
                      placeholder={field.config.placeholder || 'Enter value'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-400"
                    />
                  )}
                  {field.type === 'textarea' && (
                    <textarea
                      id={`field-${recordIndex}-${fieldIndex}`}
                      placeholder={field.config.placeholder || 'Enter text'}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-400"
                    ></textarea>
                  )}
                  {field.type === 'select' && (
                    <div className="relative">
                      <select
                        id={`field-${recordIndex}-${fieldIndex}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-400 appearance-none bg-gray-50"
                      >
                        {field.config.options?.split(',').map((option, idx) => (
                          <option key={idx} value={option.trim()}>
                            {option.trim()}
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                        <FiChevronDown />
                      </span>
                    </div>
                  )}
                  {field.type === 'radio' && (
                    <div
                      className={`${
                        field.config.layout === 'horizontal'
                          ? 'flex items-center space-x-4'
                          : 'space-y-2'
                      }`}
                    >
                      {field.config.options?.split(',').map((option, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-3 text-gray-700"
                        >
                          <input
                            type="radio"
                            name={`radio-${recordIndex}-${fieldIndex}`}
                            className="peer hidden"
                            value={option.trim()}
                          />
                          <div className="h-5 w-5 rounded-full border border-gray-400 flex items-center justify-center bg-gray-100 peer-checked:bg-gray-600 peer-checked:border-dotted">
                            <FiCircle className="text-gray-400" />
                          </div>
                          <span className="text-sm">{option.trim()}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {field.type === 'checkbox' && (
                    <div
                      className={`${
                        field.config.layout === 'horizontal'
                          ? 'flex items-center space-x-4'
                          : 'space-y-2'
                      }`}
                    >
      {field.config.options?.split(',').map((option, idx) => (
  <label
    key={idx}
    className="flex items-center space-x-3 text-gray-700"
  >
    <input
      type="checkbox"
      className="h-5 w-5 border-gray-400 rounded focus:ring-0 focus:outline-none checked:bg-gray-600 checked:border-gray-600"
      value={option.trim()}
    />
    <span className="text-sm">{option.trim()}</span>
  </label>
))}

                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldBuilder;
