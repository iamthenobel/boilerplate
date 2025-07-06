import { useState } from 'react';
import {
  FiUser, FiMail, FiEdit2, FiLink, FiCalendar, FiMapPin,
  FiGrid, FiMessageSquare, FiImage, FiShare2, FiHeart, FiMoreHorizontal,
  FiSettings, FiArrowLeft, FiX, FiCamera // Added more icons for richer UI
} from 'react-icons/fi';
import { MdVerified } from 'react-icons/md'; // For a verified badge example

const initialProfile = {
  profilePicture: 'https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=facearea&w=300&q=80', // Updated Unsplash profile
  coverPhoto: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1500&q=80', // Updated Unsplash cover
  name: 'John Doe',
  username: '@johndoe_official',
  bio: 'A passionate creator and lifelong learner. Exploring the intersection of technology and art. Connect with me for collaborations!',
  email: 'john.doe@example.com',
  website: 'https://www.johndoe.com',
  location: 'Lagos, Nigeria', // Added location
  joinedDate: 'Joined July 2023', // Added joined date
  followers: 12345,
  following: 567,
  postsCount: 245,
  isVerified: true, // Example verified status
};

const dummyPosts = [
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80', likes: 120, comments: 15 },
  { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80', likes: 230, comments: 30 }, // New image for post 2
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80', likes: 80, comments: 10 },
  { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80', likes: 180, comments: 25 },
  { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80', likes: 90, comments: 12 },
  { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80', likes: 300, comments: 40 }, // Updated image for post 6
];

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [activeTab, setActiveTab] = useState('posts'); // For navigation tabs

  const handleEdit = () => {
    setEditing(true);
    setForm(profile); // Reset form to current profile values
  };
  const handleCancel = () => {
    setEditing(false);
    setForm(profile); // Revert form changes if canceled
  };
  const handleSave = (e) => {
    e.preventDefault(); // Prevent default form submission
    setProfile(form);
    setEditing(false);
    // In a real app, you'd send 'form' data to a backend here
    alert('Profile updated successfully!'); // Simple confirmation
  };

  const handleFileChange = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm(prevForm => ({
          ...prevForm,
          [field]: event.target.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen pb-12 text-sm sm:text-base">
      {/* Edit Mode Modal/Page */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl transform scale-95 opacity-0 animate-scale-in p-4 sm:p-6">
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              aria-label="Close edit profile"
            >
              <FiX />
            </button>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Edit Profile</h2>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Profile Picture & Cover Photo Upload */}
              <div className="flex flex-col items-center mb-4 sm:mb-6">
                <div className="relative mb-4 group w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-400 dark:border-indigo-600 shadow-lg">
                  <img
                    src={form.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <label htmlFor="profilePhotoUpload" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <FiCamera className="text-white text-3xl" />
                    <input
                      id="profilePhotoUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'profilePicture')}
                    />
                  </label>
                </div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Change Profile Photo</label>
                
                <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden group">
                  <img
                    src={form.coverPhoto}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <label htmlFor="coverPhotoUpload" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <FiCamera className="text-white text-3xl" />
                    <input
                      id="coverPhotoUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'coverPhoto')}
                    />
                  </label>
                </div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Change Cover Photo</label>
              </div>

              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                <textarea
                  id="bio"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  rows={4}
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                <input
                  type="url"
                  id="website"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  id="location"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                />
              </div>

              <div className="flex justify-end space-x-3 mt-4 sm:mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition duration-300 text-sm sm:text-base"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Profile View */}
      <div className="container mx-auto max-w-4xl bg-white dark:bg-[#232323] rounded-xl shadow-lg mt-4 overflow-hidden text-sm sm:text-base">
        {/* Cover Photo */}
        <div className="relative w-full h-48 sm:h-64 bg-gray-200 dark:bg-[#333] overflow-hidden">
          <img
            src={profile.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="px-4 py-6 sm:px-8 -mt-20 sm:-mt-24 relative">
          {/* Profile Picture */}
          <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-[#252525] overflow-hidden shadow-lg mb-4">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
                {profile.name}
                {profile.isVerified && <MdVerified className="text-blue-500 text-2xl" title="Verified Account" />}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mt-1">{profile.username}</p>
            </div>
            <div className="flex space-x-2 sm:space-x-3">
              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition duration-300 text-sm sm:text-base flex items-center gap-2"
              >
                <FiEdit2 className="w-5 h-5" /> Edit Profile
              </button>
              <button
                className="p-2 sm:p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
                aria-label="More options"
              >
                <FiMoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
            {profile.bio}
          </p>

          {/* Additional Details */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
            <div className="flex items-center gap-1">
              <FiMapPin className="w-4 h-4" /> <span>{profile.location}</span>
            </div>
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <FiLink className="w-4 h-4" /> <span>{profile.website.replace(/^(https?:\/\/)?(www\.)?/, '')}</span>
              </a>
            )}
            <div className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" /> <span>{profile.joinedDate}</span>
            </div>
          </div>

          {/* Follower/Following Counts */}
          <div className="flex items-center space-x-4 sm:space-x-6 border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4 mb-3 sm:mb-4">
            <div className="flex items-center">
              <span className="font-bold text-base sm:text-lg mr-1">{profile.postsCount}</span>
              <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Posts</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-base sm:text-lg mr-1">{profile.followers.toLocaleString()}</span>
              <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Followers</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-base sm:text-lg mr-1">{profile.following}</span>
              <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Following</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 text-xs sm:text-sm">
            <button
              className={`flex-1 flex items-center justify-center py-2 sm:py-3 text-center font-semibold border-b-2 ${
                activeTab === 'posts'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('posts')}
            >
              <FiGrid className="mr-2 hidden sm:block" /> Posts
            </button>
            <button
              className={`flex-1 flex items-center justify-center py-2 sm:py-3 text-center font-semibold border-b-2 ${
                activeTab === 'replies'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('replies')}
            >
              <FiMessageSquare className="mr-2 hidden sm:block" /> Replies
            </button>
            <button
              className={`flex-1 flex items-center justify-center py-2 sm:py-3 text-center font-semibold border-b-2 ${
                activeTab === 'media'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('media')}
            >
              <FiImage className="mr-2 hidden sm:block" /> Media
            </button>
          </div>

          {/* Content Grid (based on active tab) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 py-4 sm:py-6 text-xs sm:text-sm">
            {activeTab === 'posts' && dummyPosts.map(post => (
              <div key={post.id} className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group">
                <img
                  src={post.url}
                  alt={`Post ${post.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white text-base sm:text-lg mr-3 sm:mr-4">
                    <FiHeart className="mr-1" /> {post.likes}
                  </div>
                  <div className="flex items-center text-white text-base sm:text-lg">
                    <FiMessageSquare className="mr-1" /> {post.comments}
                  </div>
                </div>
              </div>
            ))}
            {/* Add content for 'replies' and 'media' tabs here if needed */}
            {activeTab === 'replies' && (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8 sm:py-12 text-xs sm:text-sm">
                No replies yet.
              </div>
            )}
            {activeTab === 'media' && (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8 sm:py-12 text-xs sm:text-sm">
                No media to display.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}