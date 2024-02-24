import { create } from 'zustand'
import { User } from './types'

interface IStore {
    user: User | null;
    setUser: (user: User) => void;
    resume: string;
    setResume: (resume: string) => void;
}

const useMyStore = create<IStore>()((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    resume: '',
    setResume: (resume: string) => set({ resume })
}))

export default useMyStore