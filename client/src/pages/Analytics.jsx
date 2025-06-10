import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../component/common/LoadingSpinner";
import {
  FiUsers,
  FiMail,
  FiBarChart2,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiX,
} from "react-icons/fi";

// Analytics page
const Analytics = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [timeRange, setTimeRange] = useState("7d"); // 7d, 30d, 90d, all

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Fetch campaigns with stats
  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/user/get-campaign");
      setCampaigns(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };
  // Calculate metrics for analytics
  //metric of total campaign, active campaign, total recipients, total sent and success rate

  const calculateMetrics = () => {
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === "active").length;
    const totalRecipients = campaigns.reduce((sum, c) => sum + (c.stats?.total_recipients || 0), 0);
    const totalSent = campaigns.reduce((sum, c) => sum + (c.stats?.sent || 0), 0);
    const successRate = totalRecipients > 0 ? (totalSent / totalRecipients) * 100 : 0;

    return {
      totalCampaigns,
      activeCampaigns,
      totalRecipients,
      totalSent,
      successRate,
    };
  };

  // Get status color 
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
// Get status icon from fontawesome
  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <FiClock className="w-4 h-4" />;
      case "completed":
        return <FiCheckCircle className="w-4 h-4" />;
      case "failed":
        return <FiAlertCircle className="w-4 h-4" />;
      default:
        return <FiBarChart2 className="w-4 h-4" />;
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading Analytics..." />;
  }


  // calculating the metrics for the analytics page
  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Campaign Analytics</h1>
              <p className="text-blue-600 mt-1">Track and analyze your campaign performance</p>
            </div>
            <div className="flex gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-blue-200 rounded-xl bg-white text-blue-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="all">All time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Campaigns</p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">{metrics.totalCampaigns}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <FiBarChart2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Campaigns</p>
                <h3 className="text-2xl font-bold text-green-900 mt-1">{metrics.activeCampaigns}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <FiClock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Recipients</p>
                <h3 className="text-2xl font-bold text-purple-900 mt-1">{metrics.totalRecipients}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <FiUsers className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Success Rate</p>
                <h3 className="text-2xl font-bold text-indigo-900 mt-1">{metrics.successRate.toFixed(1)}%</h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-xl">
                <FiTrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-6">Campaign Performance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {campaigns.map((campaign) => {
                  const successRate = campaign.stats?.total_recipients
                    ? (campaign.stats.sent / campaign.stats.total_recipients) * 100
                    : 0;

                  return (
                    <tr
                      key={campaign._id}
                      className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <h4 className="text-sm font-semibold text-blue-900">{campaign.name}</h4>
                          <p className="text-sm text-blue-600">{campaign.template.subject}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          <span className="ml-1.5 capitalize">{campaign.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-900">
                        {campaign.stats?.total_recipients || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-900">
                        {campaign.stats?.sent || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 mr-2">
                            <div className="h-2 bg-blue-100 rounded-full">
                              <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{ width: `${successRate}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-blue-900">{successRate.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-900">
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Details Modal */}
        {selectedCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-blue-900">Campaign Details</h2>
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-blue-900 mb-4">Campaign Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Name</p>
                        <p className="text-blue-900">{selectedCampaign.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCampaign.status)}`}>
                          {getStatusIcon(selectedCampaign.status)}
                          <span className="ml-1.5 capitalize">{selectedCampaign.status}</span>
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Created</p>
                        <p className="text-blue-900">{new Date(selectedCampaign.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-blue-900 mb-4">Campaign Statistics</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Total Recipients</p>
                        <p className="text-blue-900">{selectedCampaign.stats?.total_recipients || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Emails Sent</p>
                        <p className="text-blue-900">{selectedCampaign.stats?.sent || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Success Rate</p>
                        <div className="flex items-center">
                          <div className="w-32 mr-2">
                            <div className="h-2 bg-blue-100 rounded-full">
                              <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{
                                  width: `${
                                    selectedCampaign.stats?.total_recipients
                                      ? (selectedCampaign.stats.sent / selectedCampaign.stats.total_recipients) * 100
                                      : 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-blue-900">
                            {selectedCampaign.stats?.total_recipients
                              ? ((selectedCampaign.stats.sent / selectedCampaign.stats.total_recipients) * 100).toFixed(1)
                              : 0}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-blue-900 mb-4">Campaign Message</h3>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-blue-600 mb-2">Subject</p>
                    <p className="text-blue-900 mb-4">{selectedCampaign.template.subject}</p>
                    <p className="text-sm font-medium text-blue-600 mb-2">Message</p>
                    <p className="text-blue-900 whitespace-pre-wrap">{selectedCampaign.template.body}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics; 