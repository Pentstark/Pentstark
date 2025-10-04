// Local storage service for data persistence
const STORAGE_KEYS = {
  LABS_PROGRESS: 'pentstark_labs_progress',
  USER_ACHIEVEMENTS: 'pentstark_achievements',
  ACTIVE_TRACKS: 'pentstark_active_tracks',
  COMPLETED_TRACKS: 'pentstark_completed_tracks',
  SUBMITTED_FLAGS: 'pentstark_submitted_flags',
};

export const storage = {
  // Labs Progress
  saveLabProgress: (labId, progress) => {
    const allProgress = storage.getLabsProgress();
    localStorage.setItem(STORAGE_KEYS.LABS_PROGRESS, JSON.stringify({
      ...allProgress,
      [labId]: progress
    }));
  },

  getLabsProgress: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LABS_PROGRESS) || '{}');
  },

  // Achievements
  saveAchievement: (achievement) => {
    const achievements = storage.getAchievements();
    localStorage.setItem(STORAGE_KEYS.USER_ACHIEVEMENTS, JSON.stringify([
      ...achievements,
      { ...achievement, date: new Date().toISOString() }
    ]));
  },

  getAchievements: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_ACHIEVEMENTS) || '[]');
  },

  // Tracks Progress
  startTrack: (trackId) => {
    const activeTracks = storage.getActiveTracks();
    if (!activeTracks.includes(trackId)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TRACKS, JSON.stringify([
        ...activeTracks,
        trackId
      ]));
    }
  },

  completeTrack: (trackId) => {
    const activeTracks = storage.getActiveTracks().filter(id => id !== trackId);
    const completedTracks = storage.getCompletedTracks();
    
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TRACKS, JSON.stringify(activeTracks));
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TRACKS, JSON.stringify([
      ...completedTracks,
      { trackId, completedAt: new Date().toISOString() }
    ]));
  },

  getActiveTracks: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_TRACKS) || '[]');
  },

  getCompletedTracks: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_TRACKS) || '[]');
  },

  // Flag Submissions
  submitFlag: (labId, flag, type) => {
    const submissions = storage.getSubmittedFlags();
    localStorage.setItem(STORAGE_KEYS.SUBMITTED_FLAGS, JSON.stringify([
      ...submissions,
      {
        labId,
        flag,
        type,
        timestamp: new Date().toISOString(),
        status: 'pending' // In a real app, this would be verified server-side
      }
    ]));
  },

  getSubmittedFlags: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMITTED_FLAGS) || '[]');
  },

  // Clear all data (useful for logout)
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};