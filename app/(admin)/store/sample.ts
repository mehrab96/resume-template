import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand'


interface SamplesStore {
  samples: Sample[];
  sample: Sample | null;
  searchTerm: string | null;
  links: PaginateLinks[];
  currentPage: number;
  lastPage: number;
  loader: boolean;
  setSamples: (samples: Sample[]) => void;
  setEmptySamples: () => void;
  setSample: (sample: Sample) => void;
  setEmptySample: () => void;
  setLinks: (links: PaginateLinks[]) => void;
  setLoader: (loader: boolean) => void;
  setCurrentPage: (page: number) => void;
  setLastPage: (page: number) => void;
  setSearchTerm: (searchTerm: string | null) => void;
  getAllSamples: (page: number) => void;
  getSample: (id: string) => void;
  deleteSample: (sample: Sample , index: number) => void;
  deleteSelectSamples: (ids: number[]) => void;
  getSearchSamples: (search: string ,page: number ) => void;
}
  
  const useStoreSample = create<SamplesStore>((set , get) => ({
    samples: [],
    sample : null,
    searchTerm : '',
    links: [],
    currentPage: 1,
    lastPage: 1,
    loader: false,
    setSamples: (samples) => set({ samples }),
    setEmptySamples: () => set({samples : [] }),
    setEmptySample: () => set({sample : null }),
    setSearchTerm: (searchTerm) => set({ searchTerm : searchTerm}),
    setSample: (sample) => set({ sample }),
    setLinks: (links) => set({ links  }),
    setLoader: (loader) => set({ loader }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setLastPage: (page) => set({ lastPage: page }),
    getAllSamples: async (page) => {
      try {
        if(get().searchTerm){
          var params = `page=${page}&search=${get().searchTerm}`;
        }else{
          var params = `page=${page}`;
        }
        set({loader : true});
        const response = await axios.get(`/api/work-sample/all?${params}`);
        if (response.status === 200) {
          set({
            samples: response.data.data,
            links: response.data.links,
            currentPage: response.data.current_page,
            lastPage: response.data.last_page,
            loader: false,
          });
        }
      } catch (error) {
        console.error('Error fetching samples:', error);
      }
    },
    getSample: async (id) => {
      try {
        set({loader : true})
        const response = await axios.get(`/api/work-sample/${id}`);
        if (response.status === 200) {
          set({
            sample: response.data,
            loader: false,
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
    },
    deleteSelectSamples : async (ids) => {
      try {
        const response = await axios.get(`/api/work-sample/all?removeAll=${ids}`);
        if (response.status === 200) {
          get().getAllSamples(1);
          toast.success('The Samples has removed!')
        }
      } catch (error) {
        console.error('Error fetching samples:', error);
      }
    },
    getSearchSamples : async (search , page) => {
      set({loader : true})
      const response = await axios.get(`/api/work-sample/all?page=${page}&search=${search}`);
      if(response.status === 200){
        set({
          samples: response.data.data,
          links: response.data.links,
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          loader: false,
        });
      }
    }
  }));


  export default useStoreSample;