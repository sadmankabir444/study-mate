import React from 'react';

const CreatePartnerProfile = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Create Your Partner Profile</h1>
        <p className="text-center text-gray-600 mb-8">
          This profile will be visible to other users. Provide accurate details to find the best match!
        </p>
        
        {/* Placeholder for the form */}
        <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
          <form className="space-y-6">
            {/* Subject/Skill input groups */}
            <label className="block text-sm font-medium text-gray-700">Subjects you can teach/study (e.g., Physics, JS)</label>
            <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                rows="3" 
                placeholder="List your subjects and skills, separated by commas..."
            ></textarea>

            {/* Availability input */}
            <label className="block text-sm font-medium text-gray-700">Availability (Timezone/Hours)</label>
            <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="E.g., Weekdays 7 PM - 10 PM IST"
            />
            
            {/* Bio/Description */}
            <label className="block text-sm font-medium text-gray-700">Short Bio / Teaching Style</label>
            <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                rows="5" 
                placeholder="Tell others about your study methods and expertise..."
            ></textarea>
            
            <button 
                type="submit" 
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
                Save Partner Profile
            </button>
          </form>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-500">Note: Only logged-in users can access this page and create a profile.</p>
      </div>
    </div>
  );
};

export default CreatePartnerProfile;