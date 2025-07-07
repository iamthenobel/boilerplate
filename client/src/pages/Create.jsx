
import React, { useState } from 'react';
import { UserCircleIcon, AcademicCapIcon, BriefcaseIcon, SparklesIcon, PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const LABEL_ICONS = {
  "Personal": <UserCircleIcon className="w-8 h-8 text-indigo-500" />,
  "Student": <AcademicCapIcon className="w-8 h-8 text-green-500" />,
  "Work": <BriefcaseIcon className="w-8 h-8 text-yellow-500" />,
  "Creator": <SparklesIcon className="w-8 h-8 text-pink-500" />,
};

const DEFAULT_PROFILES = [
  { id: 1, name: "John Doe", label: "Personal", active: true, avatar: null },
  { id: 2, name: "Jane Student", label: "Student", active: false, avatar: null },
  { id: 3, name: "Work Account", label: "Work", active: false, avatar: null },
  { id: 4, name: "Spark Creator", label: "Creator", active: false, avatar: null },
];

export default function Create() {
  const [profiles, setProfiles] = useState(DEFAULT_PROFILES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    label: '',
    bio: '',
    avatar: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    interests: '',
    birthday: '',
    gender: '',
    occupation: '',
    company: '',
    school: '',
    social: '',
  });
  const [formError, setFormError] = useState('');

  const handleSwitch = (id) => {
    setProfiles(profiles.map(p => ({ ...p, active: p.id === id })));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.label) {
      setFormError('Name and label are required.');
      return;
    }
    setProfiles([
      ...profiles.map(p => ({ ...p, active: false })),
      {
        id: Date.now(),
        name: form.name,
        label: form.label,
        active: true,
        avatar: form.avatar || null,
      },
    ]);
    setForm({
      name: '', label: '', bio: '', avatar: '', email: '', phone: '', location: '', website: '', interests: '', birthday: '', gender: '', occupation: '', company: '', school: '', social: '',
    });
    setFormError('');
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-[#252525] mb-6">Manage Subprofiles</h1>

      {/* Profiles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {profiles.map(profile => (
          <div
            key={profile.id}
            className={`flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md transition-all duration-200 border-2 ${profile.active ? 'border-indigo-500 shadow-lg' : 'border-transparent'} cursor-pointer hover:shadow-lg`}
            onClick={() => handleSwitch(profile.id)}
          >
            <div className="flex-shrink-0">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                LABEL_ICONS[profile.label] || <UserCircleIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg text-[#252525] truncate">{profile.name}</span>
                {profile.active && <CheckCircleIcon className="w-5 h-5 text-indigo-500" title="Active" />}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                {LABEL_ICONS[profile.label] && <span className="inline-block align-middle">{LABEL_ICONS[profile.label]}</span>}
                <span className="capitalize">{profile.label}</span>
              </div>
            </div>
            {profile.active && <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full">Active</span>}
          </div>
        ))}
        {/* Add New Profile Card */}
        <button
          onClick={() => setShowForm(true)}
          className="flex flex-col items-center justify-center gap-2 p-5 bg-[#f7f7f7] hover:bg-indigo-50 rounded-2xl border-2 border-dashed border-indigo-300 text-indigo-500 font-semibold shadow-sm transition-all duration-200 min-h-[96px]"
        >
          <PlusCircleIcon className="w-10 h-10" />
          <span>Create New Subprofile</span>
        </button>
      </div>

      {/* Create Profile Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn max-h-[90vh] flex flex-col">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#252525]">Create New Subprofile</h2>
            <form className="space-y-4 overflow-y-auto flex-1 pr-2" style={{ maxHeight: '65vh' }} onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name<span className="text-red-500">*</span></label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Label<span className="text-red-500">*</span></label>
                <select name="label" value={form.label} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
                  <option value="">Select label</option>
                  <option value="Personal">Personal</option>
                  <option value="Student">Student</option>
                  <option value="Work">Work</option>
                  <option value="Creator">Creator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                <input type="url" name="avatar" value={form.avatar} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" name="location" value={form.location} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website</label>
                  <input type="url" name="website" value={form.website} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Birthday</label>
                  <input type="date" name="birthday" value={form.birthday} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select name="gender" value={form.gender} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Occupation</label>
                  <input type="text" name="occupation" value={form.occupation} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input type="text" name="company" value={form.company} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">School</label>
                  <input type="text" name="school" value={form.school} onChange={handleFormChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Social Links</label>
                  <input type="text" name="social" value={form.social} onChange={handleFormChange} placeholder="e.g. Twitter, LinkedIn" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Interests</label>
                  <input type="text" name="interests" value={form.interests} onChange={handleFormChange} placeholder="e.g. Music, Coding, Art" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              </div>
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <button type="submit" className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200">Create Subprofile</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
