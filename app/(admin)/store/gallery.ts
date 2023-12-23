import { create } from 'zustand'
import axios from 'axios';
import toast from 'react-hot-toast';

interface GalleryStore {
    galleries: Gallery[];
    links: PaginateLinks[];
    selectedGalleries: Gallery[];
    showModal: any;
    loader: boolean;
    currentPage: number;
    lastPage: number;
    setGalleries: (galleries: Gallery[]) => void;
    setLinks: (links: PaginateLinks[]) => void;
    setCurrentPage: (page: number) => void;
    setLoader: (loader: boolean) => void;
    setModal: () => void;
    setLastPage: (page: number) => void;
    getAllGalleries: (page: number) => void;
    deleteGallery: (gallery: Gallery , index: number) => void;
    setSelectedGalleries: (gallery: Gallery , multiple : boolean) => void;
    setEmptySelectedGalleries: () => void;
}
  
const useStoreGallery = create<GalleryStore>((set) => ({
    loader: false,
    showModal: false,
    galleries: [],
    selectedGalleries: [],
    links: [],
    currentPage: 1,
    lastPage: 1,
    setGalleries: (galleries) => set({ galleries }),
    setLinks: (links) => set({ links }),
    setLoader: (loader) => set({ loader }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setLastPage: (page) => set({ lastPage: page }),
    getAllGalleries: async (page) => {
        try {
            set({loader: true});
            const response = await axios.get(`/api/upload/all?page=${page}`);
            if (response.status === 200) {
                set({
                galleries: response.data.data,
                links: response.data.links,
                currentPage: response.data.current_page,
                lastPage: response.data.last_page,
                loader: false,
                });
            }
            } catch (error) {
            console.error('Error fetching galleries:', error);
            }
    },
    deleteGallery : async (gallery , index) => {
        const res = await axios.delete(`/api/upload/${gallery.id}`);
        if(res.status == 200){
            set((state) => ({
                galleries: [...state.galleries.slice(0, index), ...state.galleries.slice(index+1)]
            }));
            toast.success('Your file has removed!')
        }
    },
    setModal: () => document.getElementById('my_modal_2').showModal(),
    setSelectedGalleries : (gallery , multiple) => {

        if(multiple){
            const isSelect = useStoreGallery.getState().selectedGalleries.some(g => g.id == gallery.id);
            if(!isSelect){
                const currentSelected = Array.isArray(useStoreGallery.getState().selectedGalleries) ? useStoreGallery.getState().selectedGalleries : [];
                currentSelected.unshift(gallery);
                set((state) => ({
                    selectedGalleries: currentSelected,
                }));
            }else{
                const array = useStoreGallery.getState().selectedGalleries.filter(g => g.id != gallery.id);
                set({
                    selectedGalleries : array
                })
            }
        }else{
            const isSelect = useStoreGallery.getState().selectedGalleries.some(g => g.id == gallery.id);
            if(!isSelect){
                set((state) => ({
                    selectedGalleries: [gallery],
                }));
            }else{
                set({
                    selectedGalleries : []
                })
            }
        }              
    },
    setEmptySelectedGalleries: () => {
        set(() => ({
            selectedGalleries: []
        }));
    }
}));

export default useStoreGallery;

