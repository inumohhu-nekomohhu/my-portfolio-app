// frontend/src/components/dashboard/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>
      
      <section className="mb-8">
        <p className="text-lg text-gray-700">
          Welcome to your dashboard! This is a placeholder for summary data and metrics.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Metric 1</h2>
          <p className="text-gray-600">Some important metric data goes here.</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Metric 2</h2>
          <p className="text-gray-600">Another metric or chart placeholder.</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Activity Log</h2>
          <p className="text-gray-600">Recent activity details can be displayed here.</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <p className="text-gray-600">Any important notifications or alerts can be shown here.</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
