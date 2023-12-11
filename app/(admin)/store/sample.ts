import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand'


interface SamplesStore {
  samples: Sample[];
  links: PaginateLinks[];
  currentPage: number;
  lastPage: number;
  setSamples: (samples: Sample[]) => void;
  setLinks: (links: PaginateLinks[]) => void;
  setCurrentPage: (page: number) => void;
  setLastPage: (page: number) => void;
  getAllSamples: (page: number) => void;
  deleteSample: (sample: Sample , index: number) => void;
}
  
  const useStoreSample = create<SamplesStore>((set) => ({
    samples: [],
    links: [],
    currentPage: 1,
    lastPage: 1,
    setSamples: (samples) => set({ samples }),
    setLinks: (links) => set({ links  }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setLastPage: (page) => set({ lastPage: page }),
    getAllSamples: async (page : number) => {
      try {
        const response = await axios.get(`/api/work-sample?page=${page}`);
        if (response.status === 200) {
          set({
            samples: response.data.data,
            links: response.data.links,
            currentPage: response.data.current_page,
            lastPage: response.data.last_page,
          });
        }
      } catch (error) {
        console.error('Error fetching samples:', error);
      }
    },
    deleteSample : async (sample , index) => {
        const res = await axios.delete(`/api/work-sample/${sample.id}`);
        if(res.status == 200){
          set((state) => ({
            samples: [...state.samples.slice(0, index), ...state.samples.slice(index+1)],
          }));
          toast.success('Sample has removed!')
        }
    }
  }));
  export default useStoreSample;