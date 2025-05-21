'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'; // responsive design / breakpoints
import Link from "next/link";

import { useMobileNavigationStore } from '@/lib/storeMobile'; // zustand store for mobile navigation

import AllTags from "@/components/tags.jsx";
import IconArchive from "@/components/UI/iconArchive";
import IconArrowRight from "@/components/UI/iconArrowRight.jsx";
import IconHome from "@/components/UI/iconHome";
import IconSettings from "@/components/UI/iconSettings";
import Logo from "@/components/UI/logo";
import SettingsHolder from '@/components/settingsHolder';
import MobileMenu from '@/components/mobileMenu';
import Loader from '@/components/UI/loader';

export default function SettingsLayout({ uniqueTags }) {
    const [isMounted, setIsMounted] = useState(false); // avoid hydration error
    // Tablet and mobile view //
    // Responsive design / breakpoints
    const isDesktop = useMediaQuery({ minWidth: 1000 });
    const contentToshow = useMobileNavigationStore(state => state.contentToshow);  // shared state via zustand store (to share with noteLayout)
    const setContentToShow = useMobileNavigationStore(state => state.setContentToShow);

    useEffect(() => {
        setContentToShow('settings');
    },[]);

    // filter notes by tag / archived / search
    const searchParams = useSearchParams()
    const router = useRouter()
  
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
    const tag = searchParams.get('tag')
    const archived = searchParams.get('archived')
    const q = searchParams.get('q')?.toLowerCase()

    function handleSearch(e) {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        if (searchQuery) {
          params.set('q', searchQuery)
        } else {
          params.delete('q')
        }
        router.push(`/user?${params.toString()}`)
      }
      // avoid hydration error
      useEffect(() => {
        setIsMounted(true);
      }, []);
    
      if (!isMounted) {
        // Optional: return a loading indicator or nothing
        // return null;
        return (<Loader />);
      }
    return(
    <>
    {isDesktop ? (
        
        <main className="user-page">

        <aside className="sidebar">
            <div className="logo-holder">
                <Logo />
            </div>
            <Link href={`/user`} className={`btn-transparent margin-bottom-05 ${searchParams.size == 0 ? 'active' : ''}`}>
                <IconHome />
                <span>All Notes</span>
                <span className="icon-arrow"><IconArrowRight /></span>
            </Link>
            <Link href={`/user?archived=true`} className={`btn-transparent margin-bottom-05 ${archived ? 'active' : ''}`}>
                <IconArchive />
                <span>Archived Notes</span>
                <span className="icon-arrow"><IconArrowRight /></span>
            </Link>
            <div className="horizontal-line"></div>
            <AllTags tags={uniqueTags} activeTag={tag} setContentToShow={setContentToShow}/>
        </aside>
        <section className="right-holder">
            <div className="header-and-search">
                <header><h1 className="text-1">Settings</h1></header>
                <div className="search-and-settings">
                    <form onSubmit={handleSearch}>
                        <label htmlFor="search" className="search-label">
                            <input type="text" className="search-input" id="search" placeholder="Search by title, content, or tags..." 
                                value={searchQuery}  onChange={e => setSearchQuery(e.target.value)} />
                            <span className="sr-only">Search</span>
                        </label>
                    </form>
                    <Link href="settings" className="btn-icon" aria-label="Settings">
                        <span className="sr-only">Settings</span>
                        <IconSettings />
                    </Link>
                </div>
            </div>
            <SettingsHolder isDesktop={isDesktop}/>
        </section>
    </main>
    )
    :
    // Layout for Tablet and Mobile
    <main className='user-page mobile-view'>
        <MobileMenu contentToshow={contentToshow} setContentToShow={setContentToShow}/> 
            <div className="logo-holder-mobile">
                <Logo />
            </div>
            <div className='note-holder-mobile'>

            <SettingsHolder isDesktop={isDesktop}/>
        </div>
    </main>
    }
    </>
    )
}