import React, { useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const openAddEventModal = () => {
    setOpenModal(true);
  };

  const closeAddEventModal = () => {
    setOpenModal(false);
    setEventName('');
    setEventDate('');
    setEventTime('');
    setEventCategory('');
    setGuestEmail('');
  };

  const handleDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setEventTime(e.target.value);
  };

  const handleAddEvent = () => {
    if (eventName.trim() && eventDate && eventTime && eventCategory) {
      setEvents([...events, { name: eventName, datetime: new Date(`${eventDate}T${eventTime}`), category: eventCategory, guests: [guestEmail] }]);
      closeAddEventModal();
    }
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  const handleSearchEvents = () => {
    // Filter events based on search query
    return events.filter((event) => event.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const handleSetReminder = (event, reminderTime) => {
    // Set reminder logic here
    alert(`Reminder set for ${event.name} at ${reminderTime}`);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`max-w-md mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} rounded shadow p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Calendar App</h1>
        <button className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`} onClick={openAddEventModal}>
          Add Event
        </button>
        <button className={`px-4 py-2 rounded ml-2 ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`} onClick={handleToggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <input
        type="text"
        placeholder="Search Events"
        className={`border border-gray-300 rounded px-3 py-2 w-full mb-4 ${darkMode ? 'bg-gray-800 text-white' : ''}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mb-4">
        {handleSearchEvents().map((event, index) => (
          <div key={index} className="border-b border-gray-300 py-2 flex items-center justify-between">
            <div>
              <p className="font-semibold">{event.name}</p>
              <p>{event.datetime.toLocaleString()}</p>
              <p>{event.category}</p>
              <p>Guests: {event.guests.join(', ')}</p>
            </div>
            <div>
              <button
                className={`text-red-500 hover:text-red-600 ${darkMode ? 'text-white' : ''}`}
                onClick={() => handleDeleteEvent(index)}
              >
                Delete
              </button>
              <button
                className={`px-2 py-1 rounded ml-2 ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                onClick={() => handleSetReminder(event, '10:00 AM')}
              >
                Set Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className={`bg-white p-6 rounded-lg w-96 ${darkMode ? 'text-white' : ''}`}>
            <h2 className="text-2xl font-bold mb-4">Add Event</h2>
            <input
              type="text"
              placeholder="Event Name"
              className={`border border-gray-300 rounded px-3 py-2 w-full mb-4 ${darkMode ? 'bg-gray-800 text-white' : ''}`}
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <input
              type="date"
              className={`border border-gray-300 rounded px-3 py-2 w-full mb-4 ${darkMode ? 'bg-gray-800 text-white' : ''}`}
              value={eventDate}
              onChange={handleDateChange}
            />
            <input
              type="time"
              className={`border border-gray-300 rounded px-3 py-2 w-full mb-4 ${darkMode ? 'bg-gray-800 text-white' : ''}`}
              value={eventTime}
              onChange={handleTimeChange}
            />
            <input
              type="text"
              placeholder="Event Category"
              className={`border border-gray-300 rounded px-3 py-2 w-full mb-4 ${darkMode ? 'bg-gray-800 text-white' : ''}`}
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Guest Email"
              className={`border border-gray-300 rounded px-3 py-2 w-full mb-4 ${darkMode ? 'bg-gray-800 text-white' : ''}`}
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'} mr-2`}
                onClick={handleAddEvent}
              >
                Add
              </button>
              <button
                className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
                onClick={closeAddEventModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
