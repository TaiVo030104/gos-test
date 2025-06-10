import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import axios from 'axios'; // Uncomment if you use axios

interface ScoreLevel {
  level: string;
  count: number;
  percentage: number;
}

interface SubjectStatistics {
  subject: string;
  displayName: string;
  levels: ScoreLevel[];
  totalStudents: number;
  color: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: SubjectStatistics[];
}

const ScoreLevels: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScoreStatistics = async () => {
      try {
        const response = await axios.get<ApiResponse>('http://localhost:9000/api/students/subject-statistics');
        console.log('API Response:', response.data); // Debug log
        
        if (response.data.success && response.data.data) {
          // Transform the data to match the chart's expected format
          const transformedData = response.data.data.map((item) => {
            const levelData = item.levels.reduce((acc: any, level) => {
              switch(level.level) {
                case '>=8 points':
                  acc['>=8'] = level.count;
                  break;
                case '6-8 points':
                  acc['6-8'] = level.count;
                  break;
                case '4-6 points':
                  acc['4-6'] = level.count;
                  break;
                case '<4 points':
                  acc['<4'] = level.count;
                  break;
              }
              return acc;
            }, {});
            
            return {
              subject: item.displayName,
              ...levelData
            };
          });
          
          console.log('Transformed Data:', transformedData); // Debug log
          setData(transformedData);
        } else {
          setError('Invalid data format received from API');
        }
      } catch (err) {
        console.error('Error fetching data:', err); // Debug log
        setError('Error fetching score statistics.');
      } finally {
        setLoading(false);
      }
    };
    fetchScoreStatistics();
  }, []);

  if (loading) return <div style={{padding: '30px'}}>Loading...</div>;
  if (error) return <div style={{padding: '30px', color: 'red'}}>Error: {error}</div>;
  if (!data || data.length === 0) return <div style={{padding: '30px'}}>No data available</div>;

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#333' }}>Subject Statistics</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <Tooltip />
            <Legend />
            <Bar dataKey=">=8" stackId="a" fill="#4caf50" name=">= 8" />
            <Bar dataKey="6-8" stackId="a" fill="#82ca9d" name="6-8" />
            <Bar dataKey="4-6" stackId="a" fill="#ffc107" name="4-6" />
            <Bar dataKey="<4" stackId="a" fill="#ff7a7a" name="< 4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreLevels; 