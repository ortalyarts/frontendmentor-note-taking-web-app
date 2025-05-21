'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive'; // responsive design / breakpoints
import Link from "next/link";

import { useMobileNavigationStore } from '@/lib/storeMobile'; // zustand store for mobile navigation

import NotesList from "@/components/notesList";
import AllTags from "@/components/tags.jsx";
import IconArchive from "@/components/UI/iconArchive";
import IconArrowRight from "@/components/UI/iconArrowRight.jsx";
import IconHome from "@/components/UI/iconHome";
import IconSettings from "@/components/UI/iconSettings";
import Logo from "@/components/UI/logo";
import MobileMenu from '@/components/mobileMenu';
import BtnGoBackMobile from '@/components/btnGoBackMobile';
import Loader from '@/components/UI/loader';

export default function NoteLayout({ children, notes, uniqueTags }) {
    const [isMounted, setIsMounted] = useState(false); // avoid hydration error

    // Tablet and mobile view //
    // Responsive design / breakpoints
    const isDesktop = useMediaQuery({ minWidth: 1000 });
    // const [contentToshow, setContentToShow] = useState('notesList'); // is replaced via zustand store (to share with settingsLayout)
    const contentToshow = useMobileNavigationStore(state => state.contentToshow);
    const setContentToShow = useMobileNavigationStore(state => state.setContentToShow);
    // pathname is used to apply different layouts in mobile & tablet view
    const pathname = usePathname(); 
    const isNotePage = pathname.startsWith('/user/') && pathname !== '/user';
    
    useEffect(() => {
        if (isNotePage) {
            setContentToShow('note');
        }
    }, [pathname]);

    useEffect(() => {
        setContentToShow('notesList');
    },[notes]);
    // End - tablet and mobile view //

    // filter notes by tag / archived / search
    const searchParams = useSearchParams()
    const router = useRouter()
  
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
    const tag = searchParams.get('tag'); 
    const archived = searchParams.get('archived')
    const q = searchParams.get('q')?.toLowerCase()

    // Filter logic
    const filteredNotes = notes.filter(note => {
      const tagMatch = tag ? note.tags?.includes(tag) : true
      const archivedMatch =
        archived === 'true' ? note.archived === true :
        archived === 'false' ? note.archived === false :
        true
  
      const searchMatch = q
        ? (
            note.title.toLowerCase().includes(q) ||
            note.content.toLowerCase().includes(q) ||
            note.tags?.toLowerCase().includes(q)
          )
        : true
  
      return tagMatch && archivedMatch && searchMatch
    })

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
        return (<Loader />);
      }
return(
    <>
   {/* Layout for Desktop */}
    {isDesktop ? ( <main className="user-page">

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
                <header><h1 className="text-1">All Notes</h1></header>
                <div className="search-and-settings">
                    <form onSubmit={handleSearch}>
                        <label htmlFor="search" className="search-label">
                            <input type="text" className="search-input" id="search" placeholder="Search by title, content, or tags..." 
                                value={searchQuery}  onChange={e => setSearchQuery(e.target.value)} />
                            <span className="sr-only">Search</span>
                        </label>
                    </form>
                    <Link href="/settings" className="btn-icon">
                        <span className="sr-only">Settings</span>
                        <IconSettings />
                    </Link>
                </div>
            </div>
            <div className="tags-note-buttons">
                <aside className="sidebar">
                    <Link href="/user/create-new-note" className="btn-main">+ Create New Note</Link>
                    <NotesList notes={filteredNotes}/>
                </aside>
                { children }
            </div>
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
                
            {!isNotePage ? 
                <Link href="/user/create-new-note" className="btn-round btn-create-mobile" aria-label="Create New Note">+</Link>
            : null}

                {/* If on Note page - shows only the note, without side bars */}
            {isNotePage ? 
                <>
                    <BtnGoBackMobile setContentToShow={setContentToShow}/>
                    { children }
                </> 
            : 
            (<>
                {contentToshow === 'notesList' && (
                    <>
                    <header>
                        {!tag ? (<h1 className="text-1">All Notes</h1>) : (<h1 className="text-1">Filtered Notes</h1>)}
                        
                    </header>
                    <NotesList notes={filteredNotes}/>
                    </>
                )}
                {contentToshow === 'search' && (
                    <>
                    <header><h1 className="text-1 margin-bottom-05">Search</h1></header>
                    <form onSubmit={handleSearch}>
                        <label htmlFor="search" className="search-label">
                            <input type="text" className="search-input" id="search" placeholder="Search by title, content, or tags..." 
                                value={searchQuery}  onChange={e => setSearchQuery(e.target.value)} />
                            <span className="sr-only">Search</span>
                        </label>
                    </form>
                    <NotesList notes={filteredNotes}/>
                    </>
                )}
                {contentToshow === 'archived' && (
                    <>
                    <header><h1 className="text-1">Archived</h1></header>
                    <NotesList notes={filteredNotes}/>
                    </>
                )}
                {contentToshow === 'tags' && (
                    <>
                    <AllTags tags={uniqueTags} activeTag={tag} setContentToShow={setContentToShow}/>
                    </>
                )}
            </>)}
       
        </div>
    </main>
    }
    </>
    )
}