import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useAuth } from './clerk-auth';

// Hook for managing lab progress
export const useLabProgress = (labId) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('lab_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('lab_id', labId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching lab progress:', error);
      }

      setProgress(data || {
        started_at: null,
        completed_at: null,
        user_flag_submitted: false,
        root_flag_submitted: false
      });
      setLoading(false);
    };

    fetchProgress();
  }, [labId]);

  const updateProgress = async (newProgress) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('lab_progress')
      .upsert({
        user_id: user.id,
        lab_id: labId,
        ...newProgress
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating lab progress:', error);
      return;
    }

    setProgress(data);
  };

  return { progress, loading, updateProgress };
};

// Hook for managing track progress
export const useTrackProgress = (trackId) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('track_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('track_id', trackId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching track progress:', error);
      }

      setProgress(data || {
        started_at: null,
        completed_at: null
      });
      setLoading(false);
    };

    fetchProgress();
  }, [trackId]);

  const updateProgress = async (newProgress) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('track_progress')
      .upsert({
        user_id: user.id,
        track_id: trackId,
        ...newProgress
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating track progress:', error);
      return;
    }

    setProgress(data);
  };

  return { progress, loading, updateProgress };
};

// Hook for managing flag submissions
export const useFlagSubmission = (labId) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('lab_progress')
        .select('user_flag_submitted, root_flag_submitted')
        .eq('user_id', user.id)
        .eq('lab_id', labId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching flag submissions:', error);
      }

      setSubmissions(data || { user_flag_submitted: false, root_flag_submitted: false });
      setLoading(false);
    };

    fetchSubmissions();
  }, [labId]);

  const submitFlag = async (flag, type) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const updateData = type === 'user' 
      ? { user_flag_submitted: true }
      : { root_flag_submitted: true };

    const { data, error } = await supabase
      .from('lab_progress')
      .upsert({
        user_id: user.id,
        lab_id: labId,
        ...updateData,
        ...((!submissions.user_flag_submitted && !submissions.root_flag_submitted) ? { started_at: new Date().toISOString() } : {}),
        ...(type === 'root' ? { completed_at: new Date().toISOString() } : {})
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting flag:', error);
      return null;
    }

    setSubmissions(data);
    return data;
  };

  return { submissions, loading, submitFlag };
};