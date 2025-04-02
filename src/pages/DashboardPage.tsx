
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { useJournal } from '../contexts/JournalContext';
import { useAuth } from '../contexts/AuthContext';
import BottomNav from '../components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage: React.FC = () => {
  const { entries } = useJournal();
  const { user } = useAuth();

  // Calculate average happiness
  const averageHappiness = useMemo(() => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.happinessRating, 0);
    return Math.round((sum / entries.length) * 10) / 10;
  }, [entries]);

  // Prepare data for the chart
  const chartData = useMemo(() => {
    // Sort entries by date
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Get the last 14 entries (or all if less than 14)
    const recentEntries = sortedEntries.slice(-14);

    return recentEntries.map(entry => ({
      date: format(new Date(entry.date), 'MMM d'),
      happiness: entry.happinessRating
    }));
  }, [entries]);

  // Calculate happiness trends
  const happinessTrend = useMemo(() => {
    if (entries.length < 3) return 'Not enough data';
    
    const recent = entries
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7);
    
    if (recent.length < 3) return 'Not enough recent data';
    
    const recentAvg = recent.reduce((acc, entry) => acc + entry.happinessRating, 0) / recent.length;
    
    if (recentAvg > averageHappiness + 0.5) return 'Trending upward';
    if (recentAvg < averageHappiness - 0.5) return 'Trending downward';
    return 'Stable';
  }, [entries, averageHappiness]);

  // Calculate happiness statistics
  const happinessStats = useMemo(() => {
    if (entries.length === 0) return { highest: 0, lowest: 0 };
    
    const highest = Math.max(...entries.map(entry => entry.happinessRating));
    const lowest = Math.min(...entries.map(entry => entry.happinessRating));
    
    return { highest, lowest };
  }, [entries]);

  const getHappinessColor = (rating: number) => {
    if (rating <= 3) return 'text-red-500';
    if (rating <= 5) return 'text-orange-500';
    if (rating <= 7) return 'text-yellow-500';
    if (rating <= 9) return 'text-lime-500';
    return 'text-green-500';
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Happiness Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-lg mx-auto">
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Happiness Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-500">Average</p>
                  <p className={`text-2xl font-bold ${getHappinessColor(averageHappiness)}`}>
                    {averageHappiness}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Entries</p>
                  <p className="text-2xl font-bold">{entries.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trend</p>
                  <p className="text-sm font-medium">{happinessTrend}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {entries.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Happiness History</h2>
              <Card>
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="happiness" 
                        stroke="#E67E22" 
                        strokeWidth={2} 
                        dot={{ fill: '#E67E22' }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Happiness Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="journal-card">
                      <p className="text-sm text-gray-500">Highest Rating</p>
                      <p className={`text-2xl font-bold ${getHappinessColor(happinessStats.highest)}`}>
                        {happinessStats.highest}
                      </p>
                    </div>
                    <div className="journal-card">
                      <p className="text-sm text-gray-500">Lowest Rating</p>
                      <p className={`text-2xl font-bold ${getHappinessColor(happinessStats.lowest)}`}>
                        {happinessStats.lowest}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {entries
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 3)
                      .map(entry => (
                        <div key={entry.id} className="flex justify-between items-center p-2 border-b">
                          <div>
                            <p className="font-medium">{format(new Date(entry.date), 'MMM d, yyyy')}</p>
                          </div>
                          <div className={`font-bold ${getHappinessColor(entry.happinessRating)}`}>
                            {entry.happinessRating}/10
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="journal-card text-center py-8">
            <p className="text-gray-500">No entries yet. Start journaling to see your happiness trends!</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default DashboardPage;
