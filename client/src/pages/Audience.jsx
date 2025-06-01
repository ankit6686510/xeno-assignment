import React, { useState, useEffect } from "react";
import { useApi } from "../context/ApiContext";
import { toast } from "react-hot-toast";
import { FiUsers, FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import Segment from "../component/Campaign/Segment";

const Audience = () => {
  const { axiosInstance } = useApi();
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateSegment, setShowCreateSegment] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState(null);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/segment/get-segment");
      if (response.data.success) {
        setSegments(response.data.data || []);
      } else {
        throw new Error(response.data.message || "Failed to fetch segments");
      }
    } catch (error) {
      console.error("Error fetching segments:", error);
      toast.error(error.response?.data?.message || "Failed to fetch segments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSegment = () => {
    setShowCreateSegment(true);
  };

  const handleSegmentCreated = () => {
    setShowCreateSegment(false);
    fetchSegments();
    toast.success("Segment created successfully");
  };

  const filteredSegments = segments.filter((segment) =>
    segment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showCreateSegment ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Create New Segment</h1>
            <button
              onClick={() => setShowCreateSegment(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Segments
            </button>
          </div>
          <Segment onSegmentCreated={handleSegmentCreated} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-blue-600">Audience Segments</h1>
              <p className="mt-1 text-sm text-blue-500">
                Manage your customer segments for targeted campaigns
              </p>
            </div>
            <button
              onClick={handleCreateSegment}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiPlus className="-ml-1 mr-2 h-5 w-5" />
              Create Segment
            </button>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search segments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <FiFilter className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                  Filter
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading segments...</p>
              </div>
            ) : filteredSegments.length === 0 ? (
              <div className="p-8 text-center">
                <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No segments found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new segment.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleCreateSegment}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Create Segment
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredSegments.map((segment) => (
                  <div
                    key={segment._id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedSegment(segment)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{segment.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{segment.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {segment.customer_count || "N/A under service"} 
                        </span>
                        <span className="text-gray-400">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Audience; 