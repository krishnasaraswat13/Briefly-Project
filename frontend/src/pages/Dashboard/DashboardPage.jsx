import React, { useRef } from 'react';
import Spinner from '../../components/common/Spinner';
import progressService from '../../services/progress.service.js';
import toast from 'react-hot-toast';
import { FileText, Dock, TrendingUp, BrainCircuit, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchDashboard = async () => {
      try {
        const fetchedData = await progressService.getDashboard();
        setDashboardData(fetchedData.data);
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!dashboardData || !dashboardData.overview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D9488]/10 to-[#0369A1]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <p className="text-base text-foreground/70 mt-4">No dashboard data available</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Documents',
      value: dashboardData.overview.documentCount,
      icon: FileText,
      gradient: 'from-primary to-secondary',
    },
    {
      label: 'Total Flashcards',
      value: dashboardData.overview.flashcardsetCount,
      icon: Dock,
      gradient: 'from-accent to-amber-600',
    },
    {
      label: 'Total Quizzes',
      value: dashboardData.overview.quizzesCount,
      icon: BrainCircuit,
      gradient: 'from-secondary to-primary',
    },
  ];

  return (
    <div className="min-h-screen py-4">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-medium mb-2">Dashboard</h1>
          <p className="text-base">Track your learning progress</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative border border-primary/20 hover:border-primary/50 rounded-2xl shadow-lg shadow-primary/10 p-6 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-foreground/70">{stat.label}</span>
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg shadow-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon strokeWidth={2} className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-semibold tracking-tight mt-2 text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Clock strokeWidth={2} className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-medium tracking-tight text-foreground">Recent Activity</h3>
        </div>

        {dashboardData.recentActivity &&
        (dashboardData.recentActivity.documents.length > 0 ||
          dashboardData.recentActivity.quizzes.length > 0) ? (
          <div>
            {[
              ...(dashboardData.recentActivity.documents || []).map((doc) => ({
                id: doc._id,
                description: doc.title,
                timestamp: doc.lastAccessed || doc.createdAt,
                link: `/documents/${doc._id}`,
                type: 'document',
              })),
              ...(dashboardData.recentActivity.quizzes || []).map((quiz) => ({
                id: quiz._id,
                description: quiz.title,
                timestamp: quiz.completedAt || quiz.createdAt,
                isComplete: quiz.completedAt ? true : false,
                link: `/quizzes/${quiz._id}`,
                type: 'quiz',
              })),
            ]
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((activity, index) => (
                <div
                  key={activity.id || index}
                  className="group flex items-center justify-between p-4 rounded-xl border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 mb-2 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-xl"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-2 h-2 rounded-full ${activity.type === 'document' ? 'bg-primary' : 'bg-accent'}`}
                      />
                      <p className="text-sm font-medium truncate text-foreground">
                        Accessed {activity.type === 'document' ? 'Document' : 'Quiz'}
                        {': '}
                        <span className="text-light">{activity.description}</span>
                      </p>
                    </div>
                    <p className="text-xs pl-4 text-foreground/50">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  {activity.link && (
                    <a
                      href={activity.link}
                      className="ml-4 px-4 py-2 text-xs font-semibold bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg transition-all duration-300 text-light"
                    >
                      View
                    </a>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4">
              <Clock className="h-8 w-8 " />
            </div>
            <p className="text-sm">No recent activity yet.</p>
            <p className="text-xs">Start learning to see your progress here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
