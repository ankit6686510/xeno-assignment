import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../component/common/LoadingSpinner";
import {
  FiPlus,
  FiUsers,
  FiMail,
  FiBarChart2,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

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
    return <LoadingSpinner label="Loading Campaigns..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Campaigns</h1>
            <p className="text-blue-600">Manage and track your marketing campaigns</p>
          </div>
          <button
            onClick={() => navigate("/campaigns/create")}
            className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Create Campaign
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Campaigns</p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">{campaigns.length}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <FiBarChart2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Campaigns</p>
                <h3 className="text-2xl font-bold text-green-900 mt-1">
                  {campaigns.filter(c => c.status === "active").length}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <FiClock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Recipients</p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">
                  {campaigns.reduce((sum, c) => sum + (c.stats?.total_recipients || 0), 0)}
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Emails Sent</p>
                <h3 className="text-2xl font-bold text-purple-900 mt-1">
                  {campaigns.reduce((sum, c) => sum + (c.stats?.sent || 0), 0)}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <FiMail className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
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
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {campaigns.map((campaign) => (
                  <tr key={campaign._id} className="hover:bg-blue-50/50 transition-colors">
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
                    <td className="px-6 py-4 text-sm text-blue-900">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/campaigns/${campaign._id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
