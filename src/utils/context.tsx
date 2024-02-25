import { create } from 'zustand'
import { Repo, User } from './types'

interface IStore {
    user: User | null;
    setUser: (user: User) => void;
    resume: string;
    setResume: (resume: string) => void;
    repos: Repo[];
    setRepos: (repos: Repo[]) => void;
}

const useMyStore = create<IStore>()((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    resume: '',
    setResume: (resume: string) => set({ resume }),
    repos: [],
    setRepos: (repos: Repo[]) => set({ repos })
}))

export default useMyStore