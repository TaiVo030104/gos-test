import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Student {
  sbd: string;
  toan: string | number;
  vat_li: string | number;
  hoa_hoc: string | number;
  average: number;
  rank: number;
}

const TopStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/students/top-10-group-a');
        
        if (response.data.success) {
          setStudents(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch top students');
        }
      } catch (err) {
        setError('Error fetching top students data.');
      } finally {
        setLoading(false);
      }
    };
    fetchTopStudents();
  }, []);

  // Helper function to format score values
  const formatScore = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') return value.toFixed(2);
    if (typeof value === 'string') {
      const num = parseFloat(value);
      return isNaN(num) ? 'N/A' : num.toFixed(2);
    }
    return 'N/A';
  };

  if (loading) return <div style={{padding: '30px'}}>Loading</div>;
  if (error) return <div style={{padding: '30px', color: 'red'}}>Lỗi: {error}</div>;

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#333' }}>Top 10 students of group A</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        {students.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f2f2f2' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Rank</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>SBD</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Toan</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Vat li</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Hoa hoc</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Điem trung binh</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.sbd} style={{ 
                  background: student.rank <= 3 ? '#fff3cd' : 'white',
                  fontWeight: student.rank <= 3 ? 'bold' : 'normal'
                }}>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                    {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : student.rank}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.sbd}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{formatScore(student.toan)}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{formatScore(student.vat_li)}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{formatScore(student.hoa_hoc)}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                    {student.average.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không tìm thấy học sinh nào trong top 10 khối A.</p>
        )}
      </div>
    </div>
  );
};

export default TopStudents; 