'use client';

import { useState } from 'react';

const Modal = ({ onClose, onSave }) => {
  const [fields, setFields] = useState([]);
  const [gridColumns, setGridColumns] = useState(3); // Default to 3 columns

  const fieldTypes = [
    { label: 'Input Field', value: 'input' },
    { label: 'Textarea', value: 'textarea' },
    { label: 'Select Box', value: 'select' },
    { label: 'Radio Button', value: 'radio' },
    { label: 'Checkbox', value: 'checkbox' },
  ];

  const addField = () => {
    setFields([...fields, { id: Date.now(), type: '', title: '', config: {} }]);
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    if (key === 'type' || key === 'title') {
      updatedFields[index][key] = value;
    } else {
      updatedFields[index].config[key] = value;
    }
    setFields(updatedFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (fields.length === 0) return alert('Please add at least one field');
    onSave(fields, gridColumns);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded shadow-lg flex flex-col max-h-screen">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Add Fields</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* UI Grid Columns */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grid Columns
            </label>
            <select
              value={gridColumns}
              onChange={(e) => setGridColumns(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            >
              {[2, 3, 4, 5, 6].map((cols) => (
                <option key={cols} value={cols}>
                  {cols} Columns
                </option>
              ))}
            </select>
          </div>

          {/* Fields */}
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 border-b pb-2">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Field {index + 1}</h4>
                <button
                  onClick={() => removeField(index)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                value={field.title || ''}
                onChange={(e) => updateField(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                placeholder="Enter field title"
              />
              <select
                value={field.type}
                onChange={(e) => updateField(index, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
              >
                <option value="">Select Field Type</option>
                {fieldTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Additional Configurations */}
              {field.type === 'input' && (
                <>
                  <input
                    type="text"
                    placeholder="Placeholder Text"
                    value={field.config.placeholder || ''}
                    onChange={(e) =>
                      updateField(index, 'placeholder', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                  />
                  <select
                    value={field.config.inputType || ''}
                    onChange={(e) =>
                      updateField(index, 'inputType', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                    <option value="date">Date</option>
                  </select>
                </>
              )}
              {field.type === 'textarea' && (
                <input
                  type="text"
                  placeholder="Placeholder Text"
                  value={field.config.placeholder || ''}
                  onChange={(e) =>
                    updateField(index, 'placeholder', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              )}
              {field.type === 'select' && (
                <input
                  type="text"
                  placeholder="Options (comma-separated)"
                  value={field.config.options || ''}
                  onChange={(e) =>
                    updateField(index, 'options', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              )}
              {field.type === 'radio' && (
                <>
                  <input
                    type="text"
                    placeholder="Radio Options (comma-separated)"
                    value={field.config.options || ''}
                    onChange={(e) =>
                      updateField(index, 'options', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                  />
                  <select
                    value={field.config.layout || 'vertical'}
                    onChange={(e) =>
                      updateField(index, 'layout', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="vertical">Vertical</option>
                    <option value="horizontal">Horizontal</option>
                  </select>
                </>
              )}
              {field.type === 'checkbox' && (
                <>
                  <input
                    type="text"
                    placeholder="Checkbox Options (comma-separated)"
                    value={field.config.options || ''}
                    onChange={(e) =>
                      updateField(index, 'options', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                  />
                  <select
                    value={field.config.layout || 'vertical'}
                    onChange={(e) =>
                      updateField(index, 'layout', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="vertical">Vertical</option>
                    <option value="horizontal">Horizontal</option>
                  </select>
                </>
              )}
            </div>
          ))}
          <button
            onClick={addField}
            className="w-full px-3 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 mb-4"
          >
            Add Another Field
          </button>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Save Fields
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
