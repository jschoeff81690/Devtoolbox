import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { useDarkMode } from '../context/DarkModeContext';
import LineNumberedEditor from '../components/LineNumberedEditor';
import LineNumberedOutput from '../components/LineNumberedOutput';

export default function JsonSchemaGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    required: true,
    examples: true,
    additionalProperties: false,
    verbose: false,
    title: '',
    description: '',
  });
  const { darkMode } = useDarkMode();

  const generateSchema = () => {
    try {
      // Parse the input JSON
      const parsedJson = JSON.parse(input);
      
      // Generate the schema
      const schema = generateJsonSchema(parsedJson, options);
      
      // Format the output
      setOutput(JSON.stringify(schema, null, 2));
      setError('');
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const handleOptionChange = (option: string, value: boolean | string) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const loadSampleData = () => {
    const sampleJson = JSON.stringify({
      "id": 1,
      "name": "Product Name",
      "price": 19.99,
      "tags": ["electronics", "gadget"],
      "stock": {
        "warehouse": "A",
        "quantity": 150,
        "reserved": 5
      },
      "isAvailable": true,
      "lastUpdated": "2023-04-01T10:30:00Z",
      "dimensions": {
        "width": 10.5,
        "height": 5.0,
        "unit": "cm"
      },
      "reviews": [
        {
          "user": "user123",
          "rating": 4,
          "comment": "Great product!"
        },
        {
          "user": "user456",
          "rating": 5,
          "comment": "Excellent quality"
        }
      ]
    }, null, 2);
    
    setInput(sampleJson);
  };

  return (
    <ToolLayout
      title="JSON Schema Generator"
      metaContent="Generate JSON Schema from JSON data automatically."
      path="json-schema-generator"
    >
      <ResponsiveToolContainer
        title="JSON Schema Generator"
        description="Automatically generate JSON Schema (draft 2020-12) from your JSON data."
        usage="Paste your JSON in the input area, configure the options, and click 'Generate Schema' to create a JSON Schema that describes your data structure."
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">JSON Input</label>
              <button
                onClick={loadSampleData}
                className={`text-sm px-2 py-1 rounded ${
                  darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Load Sample
              </button>
            </div>
            <LineNumberedEditor
              value={input}
              onChange={setInput}
              placeholder="Paste your JSON here..."
              language="json"
              height="300px"
            />
          </div>
          <div className="flex-1">
            <label className="font-medium block mb-2">Generated JSON Schema</label>
            <LineNumberedOutput
              content={output}
              language="json"
              height="300px"
              showCopyButton={true}
            />
          </div>
        </div>

        <div className={`mb-4 p-4 border rounded-md ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className="font-medium mb-2">Schema Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={options.required}
                  onChange={(e) => handleOptionChange('required', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="required">Include required properties</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="examples"
                  checked={options.examples}
                  onChange={(e) => handleOptionChange('examples', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="examples">Include examples</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="additionalProperties"
                  checked={options.additionalProperties}
                  onChange={(e) => handleOptionChange('additionalProperties', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="additionalProperties">Allow additional properties</label>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="verbose"
                  checked={options.verbose}
                  onChange={(e) => handleOptionChange('verbose', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="verbose">Verbose output (include format hints)</label>
              </div>
              <div className="mb-2">
                <label htmlFor="title" className="block mb-1">Schema title:</label>
                <input
                  type="text"
                  id="title"
                  value={options.title}
                  onChange={(e) => handleOptionChange('title', e.target.value)}
                  className={`w-full p-1 border rounded ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Optional schema title"
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-1">Schema description:</label>
                <input
                  type="text"
                  id="description"
                  value={options.description}
                  onChange={(e) => handleOptionChange('description', e.target.value)}
                  className={`w-full p-1 border rounded ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Optional schema description"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={generateSchema} 
            className={`px-4 py-2 rounded ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-custom-light-blue text-white hover:bg-custom-dark-blue'
            }`}
          >
            Generate Schema
          </button>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  );
}

// Helper functions for schema generation
function generateJsonSchema(json: any, options: any) {
  // Base schema
  const schema: any = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": getType(json)
  };

  // Add title and description if provided
  if (options.title) {
    schema.title = options.title;
  }
  
  if (options.description) {
    schema.description = options.description;
  }

  // Process based on type
  if (schema.type === 'object') {
    processObject(json, schema, options);
  } else if (schema.type === 'array') {
    processArray(json, schema, options);
  } else {
    // For primitive types, add example if enabled
    if (options.examples && json !== null) {
      schema.examples = [json];
    }
    
    // Add format hints for specific types if verbose mode is enabled
    if (options.verbose) {
      addFormatHints(json, schema);
    }
  }

  return schema;
}

function getType(value: any): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  
  const type = typeof value;
  
  // Handle special cases
  if (type === 'number') {
    // Check if it's an integer
    return Number.isInteger(value) ? 'integer' : 'number';
  }
  
  return type;
}

function processObject(obj: any, schema: any, options: any) {
  schema.properties = {};
  
  if (options.required) {
    schema.required = [];
  }
  
  // Set additionalProperties based on options
  schema.additionalProperties = options.additionalProperties;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const propertyType = getType(value);
      
      // Create property schema
      const propertySchema: any = {
        type: propertyType
      };
      
      // Add to required array if enabled
      if (options.required && value !== null) {
        schema.required.push(key);
      }
      
      // Process nested objects and arrays
      if (propertyType === 'object') {
        processObject(value, propertySchema, options);
      } else if (propertyType === 'array') {
        processArray(value, propertySchema, options);
      } else if (options.examples && value !== null) {
        // Add example for primitive types
        propertySchema.examples = [value];
      }
      
      // Add format hints if verbose mode is enabled
      if (options.verbose) {
        addFormatHints(value, propertySchema);
      }
      
      schema.properties[key] = propertySchema;
    }
  }
  
  // Remove required array if empty
  if (options.required && schema.required.length === 0) {
    delete schema.required;
  }
}

function processArray(arr: any[], schema: any, options: any) {
  if (arr.length === 0) {
    // Empty array
    schema.items = {};
    return;
  }
  
  // Check if array has consistent types
  const itemTypes = new Set(arr.map(item => getType(item)));
  
  if (itemTypes.size === 1) {
    // All items are of the same type
    const itemType = itemTypes.values().next().value;
    schema.items = { type: itemType };
    
    // Process items based on their type
    if (itemType === 'object') {
      // Merge all object structures to create a schema that fits all objects
      const mergedObject = mergeObjects(arr);
      processObject(mergedObject, schema.items, options);
    } else if (itemType === 'array') {
      // For arrays of arrays, process the first sub-array as representative
      processArray(arr[0], schema.items, options);
    } else if (options.examples) {
      // For primitive types, add examples
      schema.items.examples = [...new Set(arr.filter(item => item !== null))].slice(0, 3);
    }
  } else {
    // Mixed types - use oneOf to represent different item types
    schema.items = {
      oneOf: Array.from(itemTypes).map(type => {
        const itemSchema = { type };
        
        // Find an example of this type
        const example = arr.find(item => getType(item) === type);
        
        if (type === 'object' && example) {
          processObject(example, itemSchema, options);
        } else if (type === 'array' && example) {
          processArray(example, itemSchema, options);
        } else if (options.examples && example !== null) {
          itemSchema.examples = [example];
        }
        
        return itemSchema;
      })
    };
  }
}

function mergeObjects(objects: any[]) {
  const result: any = {};
  
  // Collect all possible keys
  objects.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (!result.hasOwnProperty(key)) {
        result[key] = obj[key];
      } else {
        const currentType = getType(result[key]);
        const newType = getType(obj[key]);
        
        // If types are different, prefer the non-null value
        if (currentType !== newType) {
          if (currentType === 'null') {
            result[key] = obj[key];
          }
        } else if (currentType === 'object') {
          // Recursively merge nested objects
          result[key] = mergeObjects([result[key], obj[key]]);
        } else if (currentType === 'array') {
          // Combine arrays
          result[key] = [...result[key], ...obj[key]];
        }
      }
    });
  });
  
  return result;
}

function addFormatHints(value: any, schema: any) {
  if (typeof value === 'string') {
    // Try to detect common string formats
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(value)) {
      schema.format = 'date-time';
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      schema.format = 'date';
    } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      schema.format = 'email';
    } else if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
      schema.format = 'uri';
    } else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
      schema.format = 'uuid';
    }
  } else if (typeof value === 'number') {
    // Add constraints for numbers if they seem to be within certain ranges
    if (value >= 0 && value <= 100 && Number.isInteger(value)) {
      schema.minimum = 0;
      schema.maximum = 100;
    }
  }
}
