import React, { useState } from 'react';
import axios from 'axios';

interface Student {
  sbd: string;
  toan?: string | number;
  ngu_van?: string | number;
  ngoai_ngu?: string | number;
  vat_li?: string | number;
  hoa_hoc?: string | number;
  sinh_hoc?: string | number;
  lich_su?: string | number;
  dia_li?: string | number;
  gdcd?: string | number;
  ma_ngoai_ngu?: string;
}

const ScoreLookup: React.FC = () => {
  const [sbd, setSbd] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper function to format score values
  const formatScore = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') return value.toFixed(2);
    if (typeof value === 'string') {
      const num = parseFloat(value);
      return isNaN(num) ? '-' : num.toFixed(2);
    }
    return '-';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (sbd.length !== 8) {
      setError('Registration number must be exactly 8 characters');
      return;
    }

    setLoading(true);
    setError('');
    setStudent(null);

    try {
      const response = await axios.get(`http://localhost:9000/api/students/score?sbd=${sbd}`);
      
      if (response.data.success) {
        setStudent(response.data.data);
      } else {
        setError(response.data.message || 'Student not found');
      }
    } catch (err) {
      setError('Error fetching student data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    { key: 'toan', label: 'Toan', value: student?.toan },
    { key: 'ngu_van', label: 'Ngu van', value: student?.ngu_van },
    { key: 'ngoai_ngu', label: 'Ngoai ngu', value: student?.ngoai_ngu },
    { key: 'vat_li', label: 'Vat li', value: student?.vat_li },
    { key: 'hoa_hoc', label: 'Hoa hoc', value: student?.hoa_hoc },
    { key: 'sinh_hoc', label: 'Sinh hoc', value: student?.sinh_hoc },
    { key: 'lich_su', label: 'Lich su', value: student?.lich_su },
    { key: 'dia_li', label: 'Dia li', value: student?.dia_li },
    { key: 'gdcd', label: 'GDCD', value: student?.gdcd },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-rubik">
          Score Lookup by Registration Number
        </h2>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="sbd" className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number (SBD)
            </label>
            <input
              type="text"
              id="sbd"
              value={sbd}
              onChange={(e) => setSbd(e.target.value)}
              className="input-field"
              placeholder="Enter 8-digit registration number"
              maxLength={8}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || sbd.length !== 8}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {student && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Student Found: {student.sbd}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <div key={subject.key} className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-2">{subject.label}</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatScore(subject.value)}
                  </p>
                </div>
              ))}
            </div>
            
            {student.ma_ngoai_ngu && (
              <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-gray-700 mb-2">Ma ngoai ngu</h4>
                <p className="text-lg font-semibold text-gray-800">{student.ma_ngoai_ngu}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreLookup; 