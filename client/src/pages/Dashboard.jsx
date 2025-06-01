import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";
import Pagination from "../component/dashboard/Pagination";
import Modal from "../component/dashboard/Modal";
import Tooltip from "../component/dashboard/Tooltip";
import LoadingSpinner from "../component/common/LoadingSpinner";
import {
  FiEye,
  FiMail,
  FiUsers,
  FiInfo,
  FiSearch,
  FiPlus,
} from "react-icons/fi";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(10);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedLogs, setSelectedLogs] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [logsLoading, setLogsLoading] = useState(false);
  const [segmentLoading, setSegmentLoading] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Get current campaigns for pagination
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  // Fetch segment details with loading state
  const fetchSegmentDetails = async (segmentId) => {
    try {
      setSegmentLoading(true);
      const response = await axiosInstance.get(`/user/get-segment`, {
        params: { id: segmentId._id },
      });
      setSelectedSegment(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch segment details"
      );
    } finally {
      setSegmentLoading(false);
    }
  };

  // Fetch communication logs with loading state
  const fetchCommunicationLogs = async (campaignId) => {
    try {
      setLogsLoading(true);
      const response = await axiosInstance.get(
        `/user/get-log?campaignId=${campaignId}`
      );
      setSelectedLogs(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch communication logs"
      );
    } finally {
      setLogsLoading(false);
    }
  };

  // Calculate success percentage from campaign stats
  const calculateSuccessRate = (campaign) => {
    if (!campaign.stats || campaign.stats.total_recipients === 0) return 0;
    return Math.round(
      (campaign.stats.sent / campaign.stats.total_recipients) * 100
    );
  };

  // Truncate text with ellipsis
  const truncateText = (text, length = 30) => {
    return text?.length > length ? `${text.substring(0, length)}...` : text;
  };

  if (loading) {
    return <LoadingSpinner label="Loading Dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow-lg">
            Your Campaigns
          </h1>
          <p className="text-lg text-blue-600">Monitor and manage your marketing campaigns</p>
        </div>

        {campaigns.length === 0 ? (
          <div className="bg-white/90 p-12 rounded-3xl shadow-xl text-center backdrop-blur-md max-w-2xl mx-auto">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                No Campaigns Found
              </h2>
              <p className="text-blue-600 mb-8">
                Get started by creating your first campaign
              </p>
              <button
                onClick={() => navigate("/campaigns")}
                className="px-8 py-4 bg-blue-700 text-white rounded-full font-bold shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center mx-auto text-lg"
              >
                <FiPlus className="mr-2" />
                Create Campaign
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white/90 rounded-3xl shadow-xl overflow-hidden backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-blue-50/80">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        Campaign Name
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        Total Recipients
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        Sent
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        Logs
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100/80">
                    {currentCampaigns.map((campaign) => (
                      <tr
                        key={campaign._id}
                        className="hover:bg-blue-50/60 transition-colors"
                      >
                        <td className="px-8 py-6 whitespace-nowrap text-sm text-blue-900 font-medium">
                          {campaign.name}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm text-blue-900">
                          <Tooltip content={campaign.template.subject}>
                            <button
                              onClick={() =>
                                setSelectedSubject(campaign.template.subject)
                              }
                              className="text-left hover:text-blue-700 transition-colors"
                            >
                              {truncateText(campaign.template.subject, 20)}
                            </button>
                          </Tooltip>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm text-blue-900">
                          {campaign.stats?.total_recipients || 0}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm text-blue-900">
                          {campaign.stats?.sent || 0}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm text-blue-900">
                          <button
                            onClick={() => fetchCommunicationLogs(campaign._id)}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                            disabled={logsLoading}
                          >
                            <FiEye className="inline" />
                            <span>View</span>
                          </button>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm text-blue-900">
                          <div className="flex items-center">
                            <div className="w-24 mr-3">
                              <div className="h-2.5 bg-blue-100 rounded-full overflow-hidden">
                                <div
                                  className="h-2.5 bg-blue-600 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${calculateSuccessRate(campaign)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <span className="font-medium">
                              {calculateSuccessRate(campaign)}% (
                              {campaign.stats?.sent || 0}/
                              {campaign.stats?.total_recipients || 0})
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8">
              <Pagination
                itemsPerPage={campaignsPerPage}
                totalItems={campaigns.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
              />
            </div>
          </>
        )}

        {/* Segment Details Modal */}
        <Modal
          isOpen={!!selectedSegment}
          onClose={() => setSelectedSegment(null)}
          title="Segment Details"
          blurBackground={false}
        >
          {segmentLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            selectedSegment && <SegmentDetails segment={selectedSegment} />
          )}
        </Modal>

        {/* Communication Logs Modal */}
        <Modal
          isOpen={!!selectedLogs}
          onClose={() => setSelectedLogs(null)}
          title="Communication Logs"
          size="xl"
          blurBackground={false}
        >
          {logsLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            selectedLogs && <CommunicationLogs logs={selectedLogs} />
          )}
        </Modal>

        {/* Message Modal */}
        <Modal 
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title="Full Message"
          blurBackground={false}
        >
          <div className="whitespace-pre-wrap p-4 bg-[var(--bg-black-50)] text-[var(--text-black-700)] rounded">
            {selectedMessage}
          </div>
        </Modal>

        {/* Subject Modal */}
        <Modal
          isOpen={!!selectedSubject}
          onClose={() => setSelectedSubject(null)}
          title="Full Subject"
          blurBackground={false}
        >
          <div className="p-4 bg-[var(--bg-black-50)] text-[var(--text-black-700)] rounded">
            {selectedSubject}
          </div>
        </Modal>
      </div>
    </div>
  );
};

// Segment Details Component
const SegmentDetails = ({ segment }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-[var(--text-black-900)]">
          {segment.name}
        </h3>
        <p className="text-sm text-[var(--text-black-700)]">
          {segment.description}
        </p>
      </div>

      <div>
        <h4 className="font-medium text-[var(--text-black-900)] mb-2">Rules</h4>
        <div className="bg-[var(--bg-black-900)] p-4 rounded-lg">
          <pre className="text-sm text-[var(--text-black-700)] overflow-x-auto">
            {JSON.stringify(segment.rules, null, 2)}
          </pre>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-[var(--text-black-700)]">
          <span className="font-medium">Estimated Size:</span>{" "}
          {segment.estimated_count}
        </div>
        <div className="text-sm text-[var(--text-black-700)]">
          <span className="font-medium">Created:</span>{" "}
          {new Date(segment.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

// Communication Logs Component
const CommunicationLogs = ({ logs }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter((log) => {
    if (filter !== "all" && log.status !== filter) return false;
    if (
      search &&
      !(
        log.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
        log.customer?.email?.toLowerCase().includes(search.toLowerCase()) ||
        log.status?.toLowerCase().includes(search.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });

  const statusColors = {
    queued: "bg-yellow-500",
    sent: "bg-blue-500",
    delivered: "bg-green-500",
    opened: "bg-purple-500",
    clicked: "bg-indigo-500",
    failed: "bg-red-500",
  };

  const getStatusTimeline = (log) => {
    const timeline = [];
    if (log.sent_at) timeline.push({ status: "sent", time: log.sent_at });
    if (log.delivered_at) timeline.push({ status: "delivered", time: log.delivered_at });
    if (log.opened_at) timeline.push({ status: "opened", time: log.opened_at });
    if (log.clicked_at) timeline.push({ status: "clicked", time: log.clicked_at });
    return timeline;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, email, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="queued">Queued</option>
          <option value="sent">Sent</option>
          <option value="delivered">Delivered</option>
          <option value="opened">Opened</option>
          <option value="clicked">Clicked</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status Timeline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log) => {
              const timeline = getStatusTimeline(log);
              const lastUpdate = timeline[timeline.length - 1]?.time || log.sent_at;
              
              return (
                <tr key={log._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600">
                          {log.customer?.name?.charAt(0) || "C"}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {log.customer?.name || "Unknown Customer"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {log.customer?.phone || "No phone"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.customer?.email || "No email"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[log.status] || "bg-gray-500"
                      } text-white`}
                    >
                      {log.status}
                    </span>
                    {log.failure_reason && (
                      <div className="text-xs text-red-500 mt-1">
                        {log.failure_reason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {timeline.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              statusColors[item.status]
                            } text-white`}
                          >
                            {item.status}
                          </span>
                          {index < timeline.length - 1 && (
                            <span className="mx-2 text-gray-400">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lastUpdate ? new Date(lastUpdate).toLocaleString() : "Not updated"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
