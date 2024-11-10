import React from 'react';

const HelpGuide = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Help & Guide</h1>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Applying for Leave</h2>
        <p className="text-gray-600">
          To apply for leave, go to the "Apply Leave" section in the dashboard. Fill in the necessary details such as the leave type, start date, end date, and reason for leave. Once submitted, you will be able to track the status of your application.
        </p>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Leave Status</h2>
        <p className="text-gray-600">
          You can view the status of your leave applications under the "My Leaves" section. Here, each application shows its current status: Approved, Pending, or Rejected.
        </p>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manager's Role</h2>
        <p className="text-gray-600">
          As a manager, you can view all leave requests submitted by team members in the "Manage Leaves" section. You can approve or reject requests, providing feedback if a request is rejected.
        </p>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800">1. Can I edit my leave application after submission?</h3>
            <p className="text-gray-600">No, once a leave application is submitted, it cannot be edited. Please contact your manager if changes are needed.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">2. How can I check the reason for a rejected application?</h3>
            <p className="text-gray-600">The reason for rejection is provided by the manager and can be viewed in the "My Leaves" section under the specific application.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">3. Can I cancel an approved leave?</h3>
            <p className="text-gray-600">Yes, you can request leave cancellation from the "My Leaves" section if your leave has already been approved.</p>
          </div>
        </div>
      </section>

      <div className="text-center mb-8">
      </div>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">For any additional support, please email us at</p>
          <a href="mailto:support@leaveapp.com" className="text-blue-400 hover:text-blue-300">support@leaveapp.com</a>
          <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Leave Application System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HelpGuide;
