import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, Breeder } from '../types';
import { INITIAL_ADS, INITIAL_BREEDERS } from '../data/initialData';

export type PageId =
  | 'home'
  | 'listings'
  | 'ad'
  | 'add-ad'
  | 'breeders'
  | 'prices'
  | 'calculator'
  | 'checklist'
  | 'compare'
  | 'guide'
  | 'articles'
  | 'occasions'
  | 'services'
  | 'faq'
  | 'contact'
  | 'favorites'
  | 'how'
  | 'privacy'
  | 'terms';

export interface RouteParams {
  id?: number;
  cat?: string;
  type?: string;
  sex?: string;
  region?: string;
  q?: string;
  breeder?: string;
  tag?: string;
  sub?: string;
  ad?: string;
}

interface AppContextType {
  page: PageId;
  params: RouteParams;
  navigate: (page: PageId, params?: RouteParams) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  compareList: number[];
  toggleCompare: (id: number) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  clearFavorites: () => void;
  listings: Listing[];
  breeders: Breeder[];
  addUserListing: (ad: Listing) => void;
  deleteUserListing: (id: number) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  checklistState: boolean[];
  toggleChecklistItem: (index: number) => void;
  resetChecklist: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State with URL parsing
  const [page, setPage] = useState<PageId>('home');
  const [params, setParams] = useState<RouteParams>({});

  // Parse initial route from URL search params or hash
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href);
      const p = (url.searchParams.get('page') as PageId) || 'home';
      const id = url.searchParams.get('id') ? Number(url.searchParams.get('id')) : undefined;
      const cat = url.searchParams.get('cat') || undefined;
      const type = url.searchParams.get('type') || undefined;
      const sex = url.searchParams.get('sex') || undefined;
      const region = url.searchParams.get('region') || undefined;
      const q = url.searchParams.get('q') || undefined;
      const breeder = url.searchParams.get('breeder') || undefined;
      const tag = url.searchParams.get('tag') || undefined;
      const sub = url.searchParams.get('sub') || undefined;
      const ad = url.searchParams.get('ad') || undefined;

      setPage(p);
      setParams({ id, cat, type, sex, region, q, breeder, tag, sub, ad });
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newPage: PageId, newParams: RouteParams = {}) => {
    setPage(newPage);
    setParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL query params
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage);
    Object.keys(newParams).forEach((k) => {
      const val = (newParams as any)[k];
      if (val !== undefined && val !== '') {
        url.searchParams.set(k, String(val));
      } else {
        url.searchParams.delete(k);
      }
    });
    window.history.pushState({}, '', url.toString());
  };

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('souq-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('souq-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // User listings
  const [userAds, setUserAds] = useState<Listing[]>(() => {
    try {
      const s = localStorage.getItem('souq-user-ads');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const listings: Listing[] = [...userAds, ...INITIAL_ADS];

  const addUserListing = (newAd: Listing) => {
    const updated = [newAd, ...userAds];
    setUserAds(updated);
    try {
      localStorage.setItem('souq-user-ads', JSON.stringify(updated));
    } catch {}
    showToast('تم نشر إعلانك بنجاح');
  };

  const deleteUserListing = (id: number) => {
    const updated = userAds.filter((a) => a.id !== id);
    setUserAds(updated);
    try {
      localStorage.setItem('souq-user-ads', JSON.stringify(updated));
    } catch {}
    showToast('تم حذف الإعلان');
    navigate('listings');
  };

  // Favorites
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const s = localStorage.getItem('souq-favs');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem('souq-favs', JSON.stringify(updated));
      } catch {}
      showToast(exists ? 'أُزيل من المفضلة' : 'أُضيف إلى المفضلة ❤️');
      return updated;
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
    try {
      localStorage.setItem('souq-favs', JSON.stringify([]));
    } catch {}
    showToast('تم مسح المفضلة');
  };

  // Compare
  const [compareList, setCompareList] = useState<number[]>(() => {
    try {
      const s = localStorage.getItem('souq-cmp');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const toggleCompare = (id: number) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        const updated = prev.filter((x) => x !== id);
        try {
          localStorage.setItem('souq-cmp', JSON.stringify(updated));
        } catch {}
        return updated;
      }
      if (prev.length >= 3) {
        showToast('يمكنك مقارنة 3 إعلانات كحد أقصى');
        return prev;
      }
      const updated = [...prev, id];
      try {
        localStorage.setItem('souq-cmp', JSON.stringify(updated));
      } catch {}
      showToast('أُضيف إلى المقارنة');
      return updated;
    });
  };

  const removeFromCompare = (id: number) => {
    setCompareList((prev) => {
      const updated = prev.filter((x) => x !== id);
      try {
        localStorage.setItem('souq-cmp', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    try {
      localStorage.setItem('souq-cmp', JSON.stringify([]));
    } catch {}
  };

  // Checklist
  const [checklistState, setChecklistState] = useState<boolean[]>(() => {
    try {
      const s = localStorage.getItem('souq-chk');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const toggleChecklistItem = (index: number) => {
    setChecklistState((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      try {
        localStorage.setItem('souq-chk', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetChecklist = () => {
    setChecklistState([]);
    try {
      localStorage.setItem('souq-chk', JSON.stringify([]));
    } catch {}
    showToast('تمت إعادة ضبط قائمة الفحص');
  };

  return (
    <AppContext.Provider
      value={{
        page,
        params,
        navigate,
        theme,
        toggleTheme,
        favorites,
        toggleFavorite,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        clearFavorites,
        listings,
        breeders: INITIAL_BREEDERS,
        addUserListing,
        deleteUserListing,
        toastMessage,
        showToast,
        checklistState,
        toggleChecklistItem,
        resetChecklist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
