import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

interface ContentContextType {
  content: Record<string, string>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType>({ content: {}, loading: true });

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('site_content').select('key, value');
      if (data) {
        const contentMap: Record<string, string> = {};
        data.forEach(item => {
          let val = item.value;
          try {
            if (val.startsWith('"')) val = JSON.parse(val);
          } catch (e) {}
          contentMap[item.key] = val;
        });
        setContent(contentMap);
      }
      setLoading(false);
    };

    fetchContent();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('public:site_content')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, payload => {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          const item = payload.new as any;
          let val = item.value;
          try {
            if (val.startsWith('"')) val = JSON.parse(val);
          } catch (e) {}
          setContent(prev => ({ ...prev, [item.key]: val }));
        } else if (payload.eventType === 'DELETE') {
          const item = payload.old as any;
          setContent(prev => {
            const next = { ...prev };
            delete next[item.key];
            return next;
          });
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
